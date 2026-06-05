import { WebViewer } from "@rerun-io/web-viewer";

const rrd =
  new URLSearchParams(location.search).get("url") ||
  "https://pub-aa6685b94f564a1082bebfcc7f527c2f.r2.dev/data.rrd";
const rbl =
  new URLSearchParams(location.search).get("url") ||
  "https://pub-aa6685b94f564a1082bebfcc7f527c2f.r2.dev/data.rbl";
const parent = document.getElementById("demo");

// The Rerun web viewer runs poorly on phones (heavy WASM + a large recording
// download), so we skip it entirely on small screens. The CSS hides the viewer
// frame and shows a fallback there; here we avoid even starting the viewer so
// the recording isn't downloaded over mobile data.
const isMobile = window.matchMedia("(max-width: 640px)").matches;

if (parent != null && !isMobile) {
  const viewer = new WebViewer();
  viewer.start([rrd, rbl], parent, {});

  // The info box that will show the selected entities.
  const info = document.getElementById("demo-info");

  if (info != null) {
    // To make sure the newlines are respected in the info box, we need to set the white-space style to pre.
    info.setAttribute('style', 'white-space: pre;');

    viewer.on("selection_change", (event: { items: any; }) => {
      // Hide it by default, and only show it when hovering on an entity.
      info.style.display = "none";
      info.textContent = "Selected entities:\r\n";

      for (const item of event.items) {
        if (item.type === "entity") {
          info.style.display = "block";
          info.textContent += `\t${item.entity_path}\r\n`;
        }
      }
    });
  }
}