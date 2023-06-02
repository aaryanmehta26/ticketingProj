import React, { useState } from 'react'
import { useRequest } from '../../hooks/use-request';
import { useRouter } from 'next/router'

const NewTicket = () => {

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');

    const router = useRouter();

    const { doRequest, errors } = useRequest({
        url: "/api/tickets",
        method: "post",
        body: {
            title, price
        },
        onSuccess: () => router.push('/'),
    })

    const onSubmitHandler = e => {
        e.preventDefault()
        doRequest();
    }

    const onBlurHandler = () => {
        const value = parseFloat(price);
        if (isNaN(value))
            return;

        setPrice(value.toFixed(2))
    }

    return (
        <div>
            <form onSubmit={(e) => onSubmitHandler(e)}>
                <h1>Create a Ticket</h1>
                <div className='form-group'>
                    <label>Title</label>
                    <input
                        className="form-control"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label>Price</label>
                    <input
                        className="form-control"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        onBlur={onBlurHandler}
                    />
                </div>
                {errors}
                <button className='btn btn-primary'>Submit</button>
            </form>
        </div >
    )
}

export default NewTicket
