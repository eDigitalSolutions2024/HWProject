import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


var useAttachmentsProperty = (att) => {
    const categories = useSelector(state => state.categories.categories)
    const [attachments, setattachments] = useState(att)
    const [files, setfiles] = useState([])

    useEffect(() => {
        if (attachments?.length > 0) {
            var tmp = []
            categories?.forEach(e => {
                var arr = attachments?.filter(val => val.file.category === e.name)

                if (arr.length > 0) {
                    tmp.push({
                        name: e.name,
                        files: arr
                    })
                }
            })
            if (attachments?.filter(val => val.file.category === "undefined").length > 0) {
                setfiles([...tmp, {
                    name: 'S/C',
                    files: attachments.filter(val => val.file.category === "undefined")
                }])
            } else {
                setfiles([...tmp])
            }
        }
    }, [attachments])

    return {
        files,
        setattachments,
    };
}

export default useAttachmentsProperty;