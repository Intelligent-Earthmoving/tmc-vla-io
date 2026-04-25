import { WebViewer } from "@rerun-io/web-viewer";

const rrd =
  new URLSearchParams(location.search).get("url") ||
  "https://pub-aa6685b94f564a1082bebfcc7f527c2f.r2.dev/data.rrd";
const rbl =
  new URLSearchParams(location.search).get("url") ||
  "https://pub-aa6685b94f564a1082bebfcc7f527c2f.r2.dev/data.rbl";
const parent = document.getElementById("demo");

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