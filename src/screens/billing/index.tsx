import React from 'react';
import { Header } from '../../components/header';
import { List } from '../../components/list';
import "./billing.scss"


export const Billing: React.FC = () => {
    return(
        <>
        <Header />
        <section className="container mt-1">
            <div>
                <h2 className="title">Billing</h2>
                <span className="subtitle">Pull down to see all billing.</span>
            </div>
            <div className="d-flex row justify-between align-center mt-1 lists">
                <div className="w-full mt-1">
                    <h4 className="title d-flex justify-between">Food list <span><strong>TOTAL:</strong> R$ 20,30 </span></h4>
                    <div className="box mt-2">
                        <List />
                    </div>
                </div>
                <div className="w-full mt-1">
                    <h4 className="title d-flex justify-between">Drink list <span><strong>TOTAL:</strong> R$ 20,30 </span></h4>
                    <div className="box mt-2">
                        <List />
                    </div>
                </div>
            </div>
        </section>
        <div className="total__price">
            <span>TOTAL:</span>
            <span>R$ 21,23</span>
        </div>
        </>
    )
}
