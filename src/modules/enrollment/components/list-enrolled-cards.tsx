"use client"

import { useEffect, useRef } from "react"

function iframeURLChange(iframe: any, callback: any, logRef: any) {
  var unloadHandler = function () {
    // Timeout needed because the URL changes immediately after
    // the `unload` event is dispatched.
    setTimeout(function () {
      callback(iframe.contentWindow.location.href)
    }, 0)
  }

  function attachUnload() {
    try {
      // Remove the unloadHandler in case it was already attached.
      // Otherwise, the change will be dispatched twice.
      iframe.contentWindow.removeEventListener("unload", unloadHandler)
      iframe.contentWindow.addEventListener("unload", unloadHandler)
    } catch (error: any) {
      console.error(error)
      if (logRef.current) {
        const ptext = document.createElement("p")
        logRef.current.appendChild(ptext.appendChild(document.createTextNode(error)))
        logRef.current.appendChild(document.createElement("br"))
        logRef.current.appendChild(document.createElement("br"))
        logRef.current.scrollTop = logRef.current.scrollHeight
      }
    }
  }

  iframe.addEventListener("load", attachUnload)
  attachUnload()
}

const ListEnrolledCards = () => {
  // iframe ref
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const logRef = useRef<HTMLDivElement>(null)
  // handlers
  const handleNewEnrollment = (url: string) => () => {
    if (iframeRef.current) {
      iframeRef.current.src = url
    }
  }

  useEffect(() => {
    if (logRef.current) {
      iframeURLChange(
        iframeRef.current!,
        function (newURL: any) {
          console.log("URL changed:", newURL)

          if (logRef.current) {
            logRef.current.appendChild(
              document
                .createElement("p")
                .appendChild(document.createTextNode(`URL changed: ${newURL}`))
            )
            logRef.current.appendChild(document.createElement("br"))
            logRef.current.appendChild(document.createElement("br"))
            logRef.current.scrollTop = logRef.current.scrollHeight
          }
        },
        logRef
      )
    }
  }, [logRef.current])

  return (
    <section className="flex flex-col gap-2 items-center">
      <h2 className="text-2xl">Seleccione una accion</h2>

      <div className="flex  gap-11">
        <button className="rounded-lg text-blue-300" onClick={handleNewEnrollment("/otra")}>
          abrir iframe con contenido del mismo dominio
        </button>
        <button
          className="rounded-lg text-blue-300"
          onClick={handleNewEnrollment("https://ionixlatam.com")}
        >
          abrir iframe con contenido de otro dominio
        </button>
      </div>
      <div className="flex justify-between gap-8 w-full">
        <div className="flex flex-col mt-11 items-center gap-4 basis-3/5">
          <h3 className="text-center">Iframe</h3>
          <iframe ref={iframeRef} width={680} height={480} className="border border-white" />
        </div>
        <div className="flex flex-col mt-11 items-center gap-4 basis-1/3 w-full pr-40">
          <h3 className="text-center">logs</h3>
          <div
            ref={logRef}
            className="border border-white w-full flex flex-col gap-8  overflow-y-scroll max-h-96"
          ></div>
        </div>
      </div>
    </section>
  )
}
export default ListEnrolledCards
