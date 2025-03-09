import { useState } from 'react';

const useDynamicFields = (struct) => {
    const [array, setArray] = useState([struct])

    const onAdd = () => setArray([...array, { ...struct }])

    const onChange = (indexParent, event) => {
        const newData = array.map((d, index) => {
            if (index === indexParent) {
                d[event.target.name] = event.target.value;
            }
            return d;
        });
        setArray([...newData]);
    };

    const onDelete = (indexToDelete) => {
        const newFields = array.filter((d, index) => index !== indexToDelete);
        setArray([...newFields]);
    };

    const onPopulate = (data) => {
        setArray(data)
    }

    return {
        array, onAdd, onChange, onDelete, onPopulate
    }
}

export default useDynamicFields;