import { useConsumer } from "./ContextAPIProvider";
import Popup from "./Popup";

function TableUtilities({ children, cols, filename}) {
  let table = null
  cols = (cols === undefined || cols === null) ? 1000 : cols
  const { getRole } = useConsumer()

  const handleSearch = (search, zone) => {
    if (table === null || table === undefined) {
      table = document.querySelector("table");
    }

    if (table) {
      const trs = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr")

      if (trs) {
        for (const index in trs) {

          if (trs[index].tagName === "TR") {
            let text = null, display = null

            if (zone) {
              const td = trs[index].querySelectorAll('td')[3];
              display = (td.innerHTML || td.innerText).startsWith(zone) ? '' : 'none'
            } else {
              text = trs[index].innerText || trs[index].innerHTML
              display = (text && text.toLowerCase().includes(search.toLowerCase())) ? '' : 'none'
            }

            trs[index].style.display = display;
          }
        }
      }
    }
  }

  const toCSV = () => {
    Popup("Please, wait....", true)
    if (table === null || table === undefined) {
      table = document.querySelector("table");
    }

    if (table) {
      const trs = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr")
      let dataRows = []

      let theads = table.querySelectorAll("thead")[0]
      if (theads) {
        theads = theads.querySelectorAll("tr")[0]
        if (theads) {
          theads = theads.querySelectorAll("th")

          if (theads === null || undefined) {
            theads.querySelectorAll("td")
          }

          if (theads) {
            const dtr = []
            theads.forEach((th, index) => {
              if (index < cols) {
                dtr.push(th.innerHTML || th.innerText)
              }

            })
            dataRows.push(dtr)
          }
        }
      }


      for (const index in trs) {
        let tagname = trs[index].tagName

        if (tagname && tagname.startsWith("TR")) {
          let data = []
          trs[index].querySelectorAll("td").forEach((td, index) => {
            if (index < cols) {
              data.push(td.innerHTML || td.innerText)
            }
          })

          if (data.length > 0) {
            dataRows.push(data)
          }
        }
      }

      const content = dataRows.map(row =>
        row
          .map(String)
          .map(v => v.replaceAll('"', '""'))
          .map(v => `"${v}"`)
          .join(",")
      ).join("\r\n");


      const a = document.createElement("a");
      const mimeType = "application/octet-stream";

      if (navigator.msSaveBlob) {
        navigator.msSaveBlob(new Blob([content], {
          type: mimeType
        }), filename);
      }
      else if (URL && "download" in a) {
        a.href = URL.createObjectURL(new Blob([content], {
          type: mimeType
        }));

        a.setAttribute("download", filename);
        document.body.appendChild(a);

        a.click();
        document.body.removeChild(a);
      } else {
        window.location.href = "data:application/octet-stream," + encodeURIComponent(content);
      }
    }

    Popup("Completed")
  }

  return (
    <div className="mt-4 rounded-2 mx-auto shadow-sm">
      <div className="bg-white rounded-top p-2">
        <div className="row">
          <div className={getRole() === 2 ? "d-none":"col d-flex justify-content-start align-items-center"}>
            <button className="btn btn-success btn-sm" onClick={toCSV}> CSV</button>
          </div>
          <div className="col d-flex align-items-center justify-content-end">
            <label>
              <input type="text" placeholder="Search..." className="form-control" onKeyUp={(e) => handleSearch(e.target.value)} />
            </label>
          </div>
        </div>
      </div>

      <div className="overflow-auto mb-4">
        {
          children
        }
      </div>
    </div>
  );
}

export default TableUtilities;
