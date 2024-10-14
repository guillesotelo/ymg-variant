'use client'

import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import Button from "src/components/Button/Button"

export default function PageNotFound() {
  const { lang } = useContext(AppContext)
  const notFoundHeader = lang === 'es' ? 'Nada que ver por aquí...' : 'Nothing to see here...'
  const notFoundText = lang === 'es' ? 'La página que buscas no se ha encontrado. Revisa que la URL sea correcta o vuelve al principio.'
    : 'The page you are looking for has not been found. Check the URL is correct or go back home.'
  const buttonText = lang === 'es' ? 'Volver a casa' : "Go back home"

  const goHome = () => {

  }
  return (
    <div className="notfound__container">
      <div className="notfound__col">
        <h1 className="notfound__404">404</h1>
        <h1 className="notfound__header">{notFoundHeader}</h1>
        <h2 className="notfound__text">{notFoundText}</h2>
        <Button
          label={buttonText}
          handleClick={goHome}
          bgColor="#053C5E"
          textColor="white"
          style={{ width: 'fit-content' }}
        />
      </div>
      <img className="notfound__image" src="https://media.istockphoto.com/id/1470461376/vector/freehand-retro-cartoon-burnt-toast.jpg?s=612x612&w=0&k=20&c=MKftTtB1_JJb0rRkJowNAqa-ugHoJEjLIuerxLgaKhY=" alt="404 - Page Not Found" draggable={false} />
    </div>
  )
}