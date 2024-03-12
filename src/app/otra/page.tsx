const page = () => {
  return (
    <div className="h-screen flex flex-col gap-4">
      <a className="text-blue-300" href="/otra?result=success">
        simular accion de exito
      </a>
      <br />
      <a className="text-blue-300" href="/otra?result=fail">
        simular accion de fail
      </a>
    </div>
  )
}
export default page
