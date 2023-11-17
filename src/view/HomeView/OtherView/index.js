import React, { } from 'react';
import Recording from '../../../components/Recording/index.js'
import Tablet from '../../../components/Tablet/index.js'

const OtherView = () => {
    return (
        <>
            <div className="other-view">
                <div>
                    <div>录音组件</div>
                    <div><Recording></Recording></div>
                </div>
                <div>
                    <div>Tablet</div>
                    <div><Tablet></Tablet></div>
                </div>
            </div>
        </>
    )
}

export default OtherView