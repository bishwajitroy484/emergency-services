import React, { useState } from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

function Autocomplete({ autoCompleteHandel, options }) {

    const [onclearState, setOnClearState] = useState(false)

    const handleOnSelect = (item) => {
        setOnClearState(true)
        autoCompleteHandel(item)
    }
    const formatResult = (item) => {
        return <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
    }

    return (
        <>
            <ReactSearchAutocomplete
                onClear={onclearState}
                items={options}
                onSelect={handleOnSelect}
                autoFocus={false}
                formatResult={formatResult}
                showIcon={false}
                placeholder={'Search City'}
                styling={{
                    height: '37px',
                    display: 'block',
                    width: '100%',
                    padding: '0.375rem 0.75rem',
                    fontSize: '1rem',
                    fontWeight: '400',
                    lineHeight: '1.5',
                    color: '#212529',
                    backgroundColor: '#fff',
                    backgroundClip: 'padding-box',
                    border: '1px solid #ced4da',
                    appearance: 'none',
                    borderRadius: '0.375rem',
                    transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
                }}
            />
        </>
    )
}

export default Autocomplete

