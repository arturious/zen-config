#!/usr/bin/env bash
# Links user.js and userChrome.css into the default Zen Browser profile.
# The profile folder has a random name, read it from installs.ini.
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
zen_dir="$HOME/Library/Application Support/zen"
profile="$(awk -F= '/^Default=/{print $2; exit}' "$zen_dir/installs.ini" 2>/dev/null || true)"

if [ -z "$profile" ]; then
  echo "!! Zen profile not found (run Zen once first)"
  exit 1
fi

profile_dir="$zen_dir/$profile"
mkdir -p "$profile_dir/chrome"
ln -sfn "$DIR/userChrome.css" "$profile_dir/chrome/userChrome.css"
ln -sfn "$DIR/user.js"        "$profile_dir/user.js"
echo "Linked into $profile_dir. Restart Zen for changes to take effect."
