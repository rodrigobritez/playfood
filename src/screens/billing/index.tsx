import React from 'react';
import { Header } from '../../components/header';
import { List } from '../../components/list';


export const Billing: React.FC = () => {
    return(
        <>
        <Header />
        <section className="container mt-3">
            <div>
                <h2 className="title">Billing</h2>
                <span className="subtitle">Pull down to see all billing.</span>
            </div>
            <div className="d-flex row justify-between align-center mt-2 ">
                <div className="mr-1 w-full">
                    <h4 className="title d-flex justify-between">Food list <span><strong>TOTAL:</strong> R$ 20,30 </span></h4>
                    <div className="box mt-1">
                        <List />
                    </div>
                </div>
                <div className="ml-1 w-full">
                    <h4 className="title d-flex justify-between">Drink list <span><strong>TOTAL:</strong> R$ 20,30 </span></h4>
                    <div className="box mt-1">
                        <List />
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}
