# X42: Pandora's Dream — Pixel Novel

A static HTML/CSS/JavaScript pixel-novel game using the generated Pandora paper-doll sheet.

## Features
- Login gate: username `X`, password `42`.
- Canvas-rendered room with Pandora paper-doll character.
- Clickable room interactions: Pandora's iMac, window, bunny terminal, neon portal.
- "Pandora's iMac" simulated desktop.
- Reboot sequence with glitch/dream/reality events.
- WorldPeace HTML loader. Paste GitHub `blob` links or direct HTML links.
- Display name is automatically derived from the last URL path segment with `.html` removed.
- Remote HTML opens inside a sandboxed canvas-style iframe.
- Keyboard: `R` reboot, `N` next story scene.

## GitHub Pages
Upload the folder to a GitHub repository and enable GitHub Pages.

For WorldPeace links, use:
`https://github.com/OWNER/REPO/blob/main/path/worldpeacebtn.html`

The app converts GitHub blob links to raw GitHub URLs for loading. Some remote pages may refuse iframe embedding because of browser security headers; the game shows a fallback message in that case.

## Asset
The included `assets/pandora-paperdoll.png` is the generated transparent paper-doll sheet used by the game.
