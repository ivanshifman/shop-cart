import { Link } from "react-router-dom"

const btnText = "Sing up for free"
const title = "Shop anytime, anywhere"
const desc = "Take shop on your device with our app and learn all time what you want. Just download, install and start to learn"

const AppSection = () => {
  return (
    <div className="app-section padding-tb">
      <div className="container">
        <div className="section-header text-center">
            <Link to="/signup" className="lab-btn mb-4">{btnText}</Link>
            <h2 className="title">{title}</h2>
            <p>{desc}</p>
        </div>

        <div className="section-wrapper">
            <ul className="lab-ul">
                <li><a href="#"><img src="/src/assets/images/app/01.jpg"/></a></li>
                <li><a href="#"><img src="/src/assets/images/app/02.jpg"/></a></li>
            </ul>
        </div>
      </div>
    </div>
  )
}

export default AppSection
