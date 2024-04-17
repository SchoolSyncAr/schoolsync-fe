

function MockNotifications() {

  const mockNotifications2 = [
  {
    nId: 1,
    nTitle: "1 dia de la bandera",
    nContenido: "Acto en el salon de actos a las 12.hs"
  },
  {
    nId: 2,
    nTitle: "2 9 de julio",
    nContenido: "Se festejara con empanadas"
},{
    nId: 3,
    nTitle: "3 Jornada Docente",
    nContenido: "El colegio permanecera cerrado"
}
]

  
  return (<>
    <div>
        <ul>
        {
          mockNotifications2.map((notification) => {
            return <div>
             {notification.nTitle}
             {/* <div></div> */}
             <br /><br />
              {notification.nContenido}
              <br /><br /><br /><br />
          </div>
          })
        }

        </ul>
    </div>
  </>);
}

export default MockNotifications;