import React from 'react'
import PropTypes from 'prop-types'
import Header from '../../components/Header'
import {SceneContainer} from '../../components/Panels/Scene.js'
import './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = ({ children }) => (
  <div className='container text-center'>
    <Header />
    <div className='core-layout__viewport'>
      <SceneContainer></SceneContainer>
    </div>
  </div>
)

CoreLayout.propTypes = {
  children : PropTypes.element.isRequired
}

export default CoreLayout
