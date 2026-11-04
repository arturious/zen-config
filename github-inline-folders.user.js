// ==UserScript==
// @name         GitHub inline folders
// @description  Click a folder in a repo's file table to expand it in place instead of opening it.
// @match        https://github.com/*
// @grant        none
// @run-at       document-idle
// @version      1.4
// ==/UserScript==

(() => {
  "use strict";

  // GitHub's file table on the repo page and on folder pages.
  const TABLE = 'table[aria-labelledby="folders-and-files"]';
  const TREE_HREF = /^\/([^/]+)\/([^/]+)\/tree\/([^/]+)\/(.+)$/;
  const INDENT = 20; // px per nesting level

  const ICONS = {
    dir: '<svg class="octicon octicon-file-directory-fill icon-directory" viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M1.75 1A1.75 1.75 0 0 0 0 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0 0 16 13.25v-8.5A1.75 1.75 0 0 0 14.25 3H7.5a.25.25 0 0 1-.2-.1l-.9-1.2C6.07 1.26 5.55 1 5 1H1.75Z"/></svg>',
    file: '<svg class="octicon octicon-file color-fg-muted" viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z"/></svg>',
  };

  // Octicon chevron-right, used as a mask so it takes the text color.
  const CHEVRON =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M6.22 3.22a.749.749 0 0 1 1.06 0l4.25 4.25a.749.749 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.042-.018.749.749 0 0 1-.018-1.042L9.94 8 6.22 4.28a.749.749 0 0 1 0-1.06Z'/%3E%3C/svg%3E\")";

  // Chevron before every folder (down when expanded), an empty slot of the
  // same width before files so names stay aligned. CSS only: GitHub's own
  // rows are rendered by React and are left untouched.
  const style = document.createElement("style");
  style.textContent = `
    /* every item type: (Directory), (File), (Symlink to file), ...
       (symlink links have no Link--primary class) */
    ${TABLE} tr:has(.react-directory-filename-column a[aria-label*=", ("]) .react-directory-filename-column::before {
      content: "";
      flex: none;
      width: 16px;
      height: 16px;
      margin-inline-end: -4px;
      align-self: center;
    }
    ${TABLE} tr:has(.react-directory-filename-column a[aria-label$=", (Directory)"]) .react-directory-filename-column::before {
      background-color: var(--fgColor-muted, #9198a1);
      mask: ${CHEVRON} center / 16px no-repeat;
      transition: transform 0.15s ease;
      cursor: pointer;
    }
    ${TABLE} tr[data-inline-expanded] .react-directory-filename-column::before {
      transform: rotate(90deg);
    }
  `;
  document.head.append(style);

  // Folder contents as [{ name, path, dir }]. GitHub's own JSON for the
  // folder page first (works for private repos too), the public REST API
  // as a fallback.
  async function listFolder(owner, repo, ref, path) {
    try {
      const res = await fetch(`/${owner}/${repo}/tree/${ref}/${path}`, {
        headers: { Accept: "application/json" },
        credentials: "same-origin",
      });
      const payload = res.ok && (await res.json())?.payload;
      const items = (payload?.codeViewTreeRoute ?? payload)?.tree?.items;
      if (Array.isArray(items)) {
        return items.map((i) => ({ name: i.name, path: i.path, dir: i.contentType === "directory" }));
      }
    } catch {}
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${ref}`);
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    return (await res.json()).map((i) => ({ name: i.name, path: i.path, dir: i.type === "dir" }));
  }

  // Last commit per item, { name: { date, shortMessageHtmlLink } }: the same
  // request GitHub's folder page makes. Empty on failure; rows just stay blank.
  async function commitInfo(owner, repo, ref, path) {
    try {
      const res = await fetch(`/${owner}/${repo}/tree-commit-info/${ref}/${path}`, {
        headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
        credentials: "same-origin",
      });
      return (res.ok && (await res.json())?.entries) || {};
    } catch {
      return {};
    }
  }

  function removeChildren(path) {
    document
      .querySelectorAll("tr.inline-folder-row")
      .forEach((tr) => (tr.dataset.path.startsWith(path + "/") ? tr.remove() : null));
  }

  // A copy of GitHub's own row (same cells and classes, so the table keeps its
  // columns and icon extensions still recognise it), renamed to the item, with
  // its own last commit message and date.
  function makeRow(template, owner, repo, ref, item, depth, info) {
    const tr = template.cloneNode(true);
    tr.removeAttribute("id");
    tr.classList.add("inline-folder-row");
    delete tr.dataset.inlineExpanded;
    tr.dataset.path = item.path;
    const href = `/${owner}/${repo}/${item.dir ? "tree" : "blob"}/${ref}/${item.path}`;
    for (const td of tr.cells) {
      const a = td.querySelector("a.Link--primary");
      if (a) {
        a.href = href;
        a.title = item.name;
        a.setAttribute("aria-label", `${item.name}, (${item.dir ? "Directory" : "File"})`);
        a.textContent = item.name;
        const svg = td.querySelector("svg");
        if (svg) svg.outerHTML = item.dir ? ICONS.dir : ICONS.file;
        td.style.paddingLeft = `calc(16px + ${depth * INDENT}px)`;
      } else if (td.classList.contains("react-directory-row-commit-cell")) {
        const html = info?.shortMessageHtmlLink?.value;
        const link = html && new DOMParser().parseFromString(html, "text/html").body.firstElementChild;
        td.replaceChildren(...(link ? [link] : []));
      } else if (td.querySelector(".react-directory-commit-age") && info?.date) {
        const age = document.createElement("div");
        age.className = "react-directory-commit-age";
        const time = document.createElement("relative-time");
        time.setAttribute("datetime", info.date);
        time.setAttribute("tense", "past");
        age.append(time);
        td.replaceChildren(age);
      } else {
        td.replaceChildren();
      }
    }
    return tr;
  }

  async function toggle(row, link, owner, repo, ref, path) {
    if (row.dataset.inlineExpanded) {
      delete row.dataset.inlineExpanded;
      removeChildren(path);
      return;
    }
    row.dataset.inlineExpanded = "1";
    link.style.opacity = "0.5";
    try {
      const [items, info] = await Promise.all([
        listFolder(owner, repo, ref, path),
        commitInfo(owner, repo, ref, path),
      ]);
      // folders first, like GitHub
      items.sort((a, b) => b.dir - a.dir || a.name.localeCompare(b.name));
      const depth = path.split("/").length;
      let after = row;
      for (const item of items) {
        const tr = makeRow(row, owner, repo, ref, item, depth, info[item.name]);
        after.after(tr);
        after = tr;
      }
    } catch (e) {
      delete row.dataset.inlineExpanded;
      console.warn("[inline folders]", e);
      location.href = link.href; // couldn't list it: open the folder normally
    } finally {
      link.style.opacity = "";
    }
  }

  // Capture phase: runs before GitHub's own router sees the click. Handles the
  // folder name and the chevron in front of it.
  document.addEventListener(
    "click",
    (event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (!event.target.closest(TABLE)) return;
      let link = event.target.closest("a[href]");
      if (!link) {
        const column = event.target.closest(".react-directory-filename-column");
        // the chevron is the column's ::before, i.e. its first 16px
        if (!column || event.clientX > column.getBoundingClientRect().left + 16) return;
        link = column.querySelector("a.Link--primary");
        if (!link) return;
      }
      const m = new URL(link.href, location.href).pathname.match(TREE_HREF);
      if (!m) return; // a file, not a folder
      event.preventDefault();
      event.stopImmediatePropagation();
      const [, owner, repo, ref, path] = m;
      toggle(link.closest("tr"), link, owner, repo, ref, decodeURIComponent(path));
    },
    true
  );
})();
