import React, { useState } from 'react'
import LandingPage from './LandingPage'
import CaptchaForm from './CaptchaForm'
import { Redirect, Route } from 'react-router-dom/cjs/react-router-dom.min'
import Config from '../../config'

const VendorManagement = () => {
    return (
        <div>
            {/* <Route path={'/vendor-management/:id'}>
                <VendorManagement />
            </Route>

            <Route path={'/'} exact>
                <Redirect to={Config.defaultPath} />
            </Route> */}
            <LandingPage/>
        </div>

    )
}

export default VendorManagement