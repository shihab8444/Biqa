import React, { useEffect, useRef, useState } from 'react'
import './HomePage.scss'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'

function FadeInSection(props) {
  const [isVisible, setVisible] = useState(false)
  const domRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // console.log(`entry`, entry, `is = ${entry.isIntersecting}`)
        setVisible(entry.isIntersecting)
      })
    })

    const { current } = domRef
    observer.observe(current)

    return () => observer.unobserve(current)
  }, [])
  return (
    <div
      className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
      ref={domRef}
    >
      {props.children}
    </div>
  )
}

export default function Modal() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const [user, setuser] = useState(false)
  const [modal, setModal] = useState(false)
  const [modal3, setModal3] = useState(false)
  const toogleModal3 = () => {
    setModal3(!modal3)
    setModal(false)
    setModal2(false)
  }

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener('resize', changeWidth)
  }, [])

  const toggleModal = (e) => {
    if (e) {
      setModal(!modal)
      setModal3(false)
      setModal2(false)
    }
  }
  const [modal2, setModal2] = useState(false)
  const toggleModal2 = () => {
    setModal2(!modal2)
    setModal(false)
    setModal3(false)
  }

  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
  if (modal2) {
    document.body.classList.add('active-modal2')
  } else {
    document.body.classList.remove('active-modal2')
  }
  const login = useGoogleLogin({
    onSuccess: async (respose) => {
      try {
        const res = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${respose.access_token}`,
            },
          }
        )

        console.log(res.data)
        setuser(res.data)
      } catch (err) {
        console.log(err)
      }
    },
  })
  return (
    <>
      <div className='transparent'>
        {screenWidth > 600 ? (
          <div className='navbar'>
            <nav>
              <div className='first-row'>
                <div className='companyLogo'>
                  <button className='tinder'>
                    <img src='white.png' alt='' className='logo' />
                    <img src='typo4.png' alt='' />
                  </button>
                </div>{' '}
                <div className='dropdown'>
                  <button className='navbutton'>Secutiy</button>
                  <div class='dropdown-content'>
                    <a href='#'> Security 1</a>
                    <a href='#'>Security 2</a>
                    <a href='#'>Security 3</a>
                  </div>
                </div>
                <button className='navbutton'>Preface</button>
                <button className='navbutton'>Services</button>
                <button className='navbutton'>Download</button>
                <button className='navbutton'>Contact</button>
              </div>
              <div className='second-row'>
                <div className='language'>Language</div>
                {user ? (
                  <div className='user'>
                    {user.given_name} <button className='logout'>Logout</button>
                  </div>
                ) : (
                  <button onClick={toggleModal} className='login'>
                    Login
                  </button>
                )}
              </div>
            </nav>
          </div>
        ) : (
          <>
            <nav className='navbar'>
              <button className='tinder1'>
                <img src='white.png' alt='' className='logo' />
                <img src='typo4.png' alt='' />
              </button>
              <button className='menu-icon' onClick={toogleModal3}>
                {/* icon from heroicons.com */}
                <svg
                  className='menu'
                  width='80px'
                  height='50px'
                  viewBox='0 0 28 28'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M4 7C4 6.44771 4.44772 6 5 6H24C24.5523 6 25 6.44771 25 7C25 7.55229 24.5523 8 24 8H5C4.44772 8 4 7.55229 4 7Z'
                    fill='#fc0808'
                  />
                  <path
                    d='M4 13.9998C4 13.4475 4.44772 12.9997 5 12.9997L16 13C16.5523 13 17 13.4477 17 14C17 14.5523 16.5523 15 16 15L5 14.9998C4.44772 14.9998 4 14.552 4 13.9998Z'
                    fill='#ff4000'
                  />
                  <path
                    d='M5 19.9998C4.44772 19.9998 4 20.4475 4 20.9998C4 21.552 4.44772 21.9997 5 21.9997H22C22.5523 21.9997 23 21.552 23 20.9998C23 20.4475 22.5523 19.9998 22 19.9998H5Z'
                    fill='#da0909'
                  />
                </svg>
              </button>
            </nav>
          </>
        )}

        <div>
          <div>
            <FadeInSection>
              <div className='register'>
                <div className='fade-in-text'>
                  <p className='text'>Fill In The Gap, Changing The Trend</p>
                  <div class='container'>
                    <div class='center'>
                      <div class='container2'>
                        <div class='center'>
                          <button class='btn2' onClick={toggleModal2}>
                            <svg
                              width='180px'
                              height='60px'
                              viewBox='0 0 180 60'
                              class='border'
                            >
                              <polyline
                                points='179,1 179,59 1,59 1,1 179,1'
                                class='bg-line'
                              />
                              <polyline
                                points='179,1 179,59 1,59 1,1 179,1'
                                class='hl-line'
                              />
                            </svg>
                            <span>Create Account</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </div>
      {modal2 && (
        <div>
          <div>enter your mobile number</div>
        </div>
      )}
      {modal && (
        <div className='modal'>
          <div onClick={toggleModal} className='overlay'></div>

          <div className='modal-content'>
            <div className='modal-text'>
              {/* <div className='full-logo1'>
                <img src='full logo1.png' alt='' />
              </div> */}

              <p className='started'>Get started</p>

              <p className='policy1'>
                By clicking Log In,you agree to our Terms.Learn
              </p>
              <p className='policy2'>
                how we process your data in our Privacy Policy.and
              </p>
              <p className='policy3'>
                <a href='#'>Cookie Policy</a>
              </p>
            </div>{' '}
            <div className='close-modal'>
              <div className='outer'>
                <div className='inner'>
                  <button className='close' onClick={toggleModal}>
                    <label>Back</label>
                  </button>
                </div>
              </div>
            </div>
            <div>
              {' '}
              <button className='google' onClick={() => login()}>
                Sign in with Google
              </button>
            </div>
            <button className='facebook'>Sign in with Facebook</button>
            <button className='number' onClick={toggleModal2}>
              Sign in with Phone Number
            </button>
            <p className='troubleshooting'>
              <a href='#'>Trouble Logging In?</a>
            </p>
            <p className='gettheapp'>Get The App!</p>
            <button className='Google_play'>
              <img src='/google_play.png' alt='Google_play' />
            </button>
            <button className='apple_store'>
              <img src='/apple.png' alt='' />
            </button>
          </div>
          {/* <div className='close-modal'>
              <button className='close' onClick={toggleModal}>
                CLOSE
              </button>
            </div> */}
        </div>
      )}
      {modal2 && (
        <div className='modal2'>
          <div onClick={toggleModal2} className='overlay2'></div>

          <div className='modal-content2'>
            <div className='modal-text2'>
              <p className='started2'>Create Account</p>
            </div>{' '}
            <div className='close-modal2'>
              <div className='outer2'>
                <div className='inner2'>
                  <button className='close2' onClick={toggleModal2}>
                    <p className='label1'>Close</p>
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className='field'>
                <div className='input_field'>
                  <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    required
                  />
                </div>
                <div className='input_field'>
                  <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    required
                  />
                </div>
                <div className='input_field'>
                  <input
                    type='password'
                    name='password'
                    placeholder='Re-type Password'
                    required
                  />
                </div>
                <div className='input_field'></div>
                <div className='input_field'></div>
              </div>

              <div className='done'>
                <button className='submit'>SUBMIT</button>
              </div>
            </div>
            <p className='gettheapp'>Get The App!</p>
            <button className='Google_play'>
              <img src='/google_play.png' alt='Google_play' />
            </button>
            <button className='apple_store'>
              <img src='/apple.png' alt='' />
            </button>
          </div>
        </div>
      )}

      {modal3 && (
        <div className='modal2'>
          <div onClick={toggleModal2} className='overlay2'></div>

          <div className='modal-content2'>
            <div className='modal-text2'>
              <button className='tinder3'>
                <img src='black.png' alt='' className='logo3' />
                <img src='type4Black.png' alt='' className='logo4' />
              </button>
            </div>{' '}
            <div className='close-modal2'>
              <div className='outer2'>
                <div className='inner2'>
                  <button className='close2' onClick={toogleModal3}>
                    <p className='label1'>Close</p>
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className='field'>
                <div className='input_field1'>
                  <p>Security </p>
                </div>
                <div className='input_field1'>
                  <p>Services</p>
                </div>
                <div className='input_field1'>
                  <p>preface</p>
                </div>
                <div className='input_field1'>
                  <p>Download</p>
                </div>
                <div className='input_field1'>
                  <p>Contact</p>
                </div>
              </div>
              <div className='done'>
                <button className='submit' onClick={toggleModal}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
