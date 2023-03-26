import React from 'react'
import { Link } from 'react-router-dom'
import door2door from '../assets/Urban-plants-waste-collection.jpg'
import personTrashing from "../assets/1-9-768x768.jpg"
import bulldozer from '../assets/a_mswwaste.png'
import bins from'../assets/images1.jpeg'
import { Twitter, Facebook, Instagram, Linkedin, Geo } from 'react-bootstrap-icons'

class Home extends React.Component {
    render() {
        return (
            <div className='container-fluid p-0 m-0'>
                <nav className="navbar navbar-expand-lg bg-danger">
                    <div className="container-fluid">
                        <a className="navbar-brand text-white fs-4 fw-bolder" href="#top">
                            APPLE
                        </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarText">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            </ul>
                            <ul className="navbar-nav mb-2 mb-lg-0">
                                <li className='nav-link ms-4'>
                                    <a href="#about" className="nav-item text-white text-decoration-none">ABOUT</a>
                                </li>
                                <li className='nav-link  ms-4'>
                                    <a href="#ourmission" className="nav-item text-white text-decoration-none">OUR MISSION</a>
                                </li>
                                
                                <li className='nav-link  ms-4'>
                                    <a href="#contacts" className="nav-item text-white text-decoration-none">CONTACTS</a>
                                </li>

                                <li className='ms-4'>
                                    <Link to="login" className="btn text-white border-light border-4 p-1"

                                        style={{ width: '100px', boxShadow: '2px 2px 5px navy' }}> LOGIN</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <main className='home-main'>
                    <div id="myCarousel" className="carousel slide mb-4" data-bs-ride="carousel" >
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>

                        <div className="carousel-inner bg-dark" id='top'>
                            <div className="carousel-item active">
                                <img alt="" src={door2door} style={{width:'100%', height:'100%'}}/>
                                <div className="container">
                                    <div className="carousel-caption text-start">
                                        <h1>We are just a call away</h1>
                                        <p>Let us make your place clean and remarkable</p>
                                        <p><a className="btn btn-success rounded-5 btn-lg" href="#contacts">Try us now</a></p>
                                    </div>
                                </div>
                            </div>

                            <div className="carousel-item">
                                <img alt=""  style={{width:'100%', height:'100%'}}/>
                                <div className="container">
                                    <div className="carousel-caption">
                                        <h1>We are the mop-up crew</h1>
                                        <p>With our <strong>DOOR-TO-DOOR</strong> service, we will never leave your garbage behind</p>
                                        <p><a className="btn btn-success rounded-5 btn-lg" href="#contacts">Why wait? Call us</a></p>
                                    </div>
                                </div>
                            </div>

                            <div className="carousel-item">
                                <img alt=""  src={bulldozer} style={{width:'100%', height:'100%'}}/>
                                <div className="container">
                                    <div className="carousel-caption text-end">
                                        <h1>We will never fail you</h1>
                                        <p>It's our committement, to be always buddozing your garbage</p>
                                        <p><a className="btn btn-success rounded-5 btn-lg" href="#">Flag Us Down</a></p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>

                        <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>

                    <div className="mx-4" id='about'>
                        <div className="row mb-3 pb-3 shadow rounded-2 py-4 border-primary rounded-bottom" style={{borderWidth:'0 0 5px 0'}}>
                            <div className="col-md-7">
                                <h2 className="fw-bolder mb-3">ABOUT</h2>
                                <p className="lead fs-5" style={{textAlign: 'justify'}}>
                                    <div className='mb-2'>
                                        Apple is a premier waste collection and disposal management company in Malawi offering scheduled services for 
                                        households, corporates and community at large. 
                                    </div>

                                    <div className='mb-2'>
                                        We also offer <strong>Bespoke collection services</strong> dependent on the client's needs.
                                    </div>

                                    <div className='mb-2'>
                                        Apple waste management is committed to providing quality, efficient and core-effective services to its valuable clients, acting promptly and responsibly to demands.
                                    </div>

                                    <div className='mb-2'>
                                        We are located in the centre of Lilongwe, which means that  we are well placed to respond to a wide geographic area in the city.
                                        Because of our experienced team, we are able to provide advice and support in building your waste management plan in order to meet your 
                                        waste disposal obligations. We aim to reduce your concerns whilst offering a quality service at a fair price.
                                    </div>

                                    <div className='mb-2'>
                                        Apple is a <b>registred company</b> and meets tax obligations in Malawi.
                                    </div>
                                </p>

                                <p className="lead fs-5" style={{textAlign: 'justify'}}>
                                    <h4 className="fw-bolder mb-3 fst-italic">WHY US?</h4>

                                    <div className='mb-2'>
                                        Apple offers a <b>door to door</b> service to brigde a gap in the waste collection 
                                        and disposal system. We do this by providing households, organizations, and the general public 
                                        with the most convenient, accessible, responsive and conprehensive waste management and the best customer service.
                                    </div>

                                    <div className='mb-2'>
                                        We are just <b>One Call Away</b> and you get assured to have a great service at an affordable subscription and additionally you 
                                        are constantly provided with <b>Refuge bags</b> so that you don't have to buy your own, the duty is on our shoulders making sure that our 
                                        clients are happy and confortable at all times.
                                    </div>

                                    <div className='mb-2'>
                                        We boast to have strong and working <b>collection trucks</b> that goes around the whole Lilongwe urban making it easy for us to reach 
                                        each client and make the waste collection at their own door step. With this service no garbage is left in our client's residence and offices.
                                    </div>
                                </p>
                            </div>
                            <div className="col-md-5 d-flex justify-cotent-center align-items-center">
                                <img alt='' src={personTrashing} style={{width:'100%', height:'70%'}}/>
                            </div>
                        </div>

                        <div className="row mb-3 pb-3 shadow rounded-2 border-success py-4 mt-4 rounded-bottom" style={{borderWidth:'0 0 5px 0'}} id='ourmission'>
                            <div className="col-md-7 order-md-2" >
                                <h2 className="fw-bolder">OUR MISSION</h2>
                                <p className="lead fs-5" style={{textAlign: 'justify'}}>
                                    <div className='mb-3'>
                                        Our mission is to safeguard human health and the environment by using the latest 
                                        equipment, technology and an excellent workforce to provide efficient and cost-effective, environment friendly, 
                                        industrial as well as domestic waste management and disposal.
                                    </div>

                                    <div className='mb-3'>
                                        <h4 className="fw-bolder">CORE VALUES</h4>

                                        <ul style={{listStyle:'square'}}>
                                            <li>
                                                We are committed to the pursuit of <span className='fw-bolder text-lowercase'>service excellence</span>.
                                            </li>
                                            <li>
                                                We optimize <span className='fw-bolder text-lowercase'>loyalty</span> by working collaboratively with our clients, 
                                                employees and partners to exceed shared goals.
                                            </li>
                                            <li>
                                                We are <span className='fw-bolder text-lowercase'>Passionate</span> about making a measurable impact.
                                            </li>
                                            <li>
                                                We exhibit <span className='fw-bolder text-lowercase'>Integrity</span> at all times.
                                            </li>
                                            <li>
                                                We <span className='fw-bolder text-lowercase'>respect</span> all our partners and ensure our relationship is mutually beneficial.
                                            </li>
                                        </ul>
                                    </div>

                                </p>
                            </div>
                            <div className="col-md-5 order-md-1 d-flex justify-cotent-center align-items-center">
                                <img alt='' src={bins} style={{width:'100%', height:'100%'}}/>
                            </div>
                        </div>
                    </div>


                    <div id="contacts" className='container-fluid bg-dark text-white d-flex align-items-center justify-content-center py-4'>
                        <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 pt-3 pb-0">
                            <div className="col-md-3 col-sm-12 mb-3 text-center">
                                <h5>Head Office</h5>
                                <ul className="nav flex-column">
                                    <li className="nav-item mb-2">Along Kamuzu Central Hospital Road | Opposite</li>
                                    <li className="nav-item mb-2">Glorious Light International Church</li>

                                    <li className="nav-item mb-2 d-flex justify-content-center">
                                        <Geo size={30} className="rounded-circle  bg-light text-danger p-1" style={{ cursor: 'pointer' }} />
                                    </li>
                                </ul>
                            </div>

                            <div className="col-md-3 col-sm-12 mb-3 text-center">
                                <h5>CONTACTS</h5>
                                <ul className="nav flex-column">
                                    <li className="nav-item mb-2"> +265 888 227 081</li>
                                    <li className="nav-item mb-2"> +265 998 227 081</li>
                                    <li className="nav-item mb-2">
                                        <a href='mailto:sales@Applemw.com' className='text-decoration-none'>Email: sales@Applemw.com</a>
                                    </li>
                                </ul>
                            </div>

                            <div className="col-md-3 col-sm-12 mb-3 text-center">
                                <h5>Business Hours</h5>
                                <ul className="nav flex-column">
                                    <li className="nav-item mb-2">
                                        Monday - Friday 07:00 - 16:00
                                    </li>
                                </ul>
                            </div>

                            <div className="col-md-3 col-sm-12 mb-3 text-center">
                                <h5>Links</h5>
                                <ul className="nav d-flex align-items-center justify-content-center mt-4">
                                    <li className="nav-item ms-4">
                                        <a href="#" className='text-white'>
                                            <Twitter />
                                        </a>
                                    </li>
                                    <li className="nav-item ms-4">
                                        <a href="#" className='text-white'>
                                            <Facebook />
                                        </a>
                                    </li>
                                    <li className="nav-item ms-4">
                                        <a href="#" className='text-white'>
                                            <Instagram />
                                        </a>
                                    </li>
                                    <li className="nav-item ms-4">
                                        <a href="#" className='text-white'>
                                            <Linkedin />
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className="col-md-12 col-sm-12 pt-3 text-center">
                                <p>Copyright&copy; 2023 Apple MW. All rights reserved.</p>
                            </div>
                        </footer>
                    </div>
                </main>
            </div>
        )
    }
}


export default Home;