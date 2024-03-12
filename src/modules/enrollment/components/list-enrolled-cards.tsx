"use client"

import { useEffect, useRef } from "react"

function iframeURLChange(iframe: any, callback: any) {
  var unloadHandler = function () {
    // Timeout needed because the URL changes immediately after
    // the `unload` event is dispatched.
    setTimeout(function () {
      callback(iframe.contentWindow.location.href)
    }, 0)
  }

  function attachUnload() {
    // Remove the unloadHandler in case it was already attached.
    // Otherwise, the change will be dispatched twice.
    iframe.contentWindow.removeEventListener("unload", unloadHandler)
    iframe.contentWindow.addEventListener("unload", unloadHandler)
  }

  iframe.addEventListener("load", attachUnload)
  attachUnload()
}

const ListEnrolledCards = () => {
  // iframe ref
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const iframeRef2 = useRef<HTMLIFrameElement>(null)
  // handlers
  const handleNewEnrollment = (url: string) => () => {
    // const myIframe = document.createElement("iframe")
    // myIframe.setAttribute("src", "http://localhost:3000/otra")
    // myIframe.style.width = "640px"
    // myIframe.style.height = "480px"
    // window.open(myIframe, "_blank")
    // const refWindow = window.open("https://zeleri-enrollment-v2.dev.ionix.cl", "_blank")
    // iframeURLChange(refWindow, function (newURL) {
    //   console.log("URL changed:", newURL)
    // })
    // console.log(refWindow)
    if (iframeRef.current) {
      iframeRef.current.src = url
    }
  }

  useEffect(() => {
    iframeURLChange(iframeRef.current!, function (newURL: any) {
      console.log("URL changed:", newURL)
    })
  }, [])

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
      <div className="flex flex-col mt-11 items-center gap-4">
        <h3 className="text-center">Iframe</h3>
        <iframe ref={iframeRef} width={680} height={480} className="border border-white" />
      </div>
    </section>
  )
}
export default ListEnrolledCards
