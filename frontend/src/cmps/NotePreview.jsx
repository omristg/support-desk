import { useSelector } from "react-redux"

export const NotePreview = ({ note }) => {

    const { user: { username } } = useSelector(({ auth }) => auth)

    const { text, isStaff, createdAt } = note

    return (
        <div className="note" style={{
            backgroundColor: isStaff ? 'rgba(0,0,0,0.7)' : '#fff',
            color: isStaff ? '#fff' : '#000'
        }}>
            <h4>Note from {isStaff ? (
                <span>Staff</span>
            ) : (
                <span>{username}</span>
            )}
            </h4>
            <p>{text}</p>
            <div className="note-date">
                {new Date(createdAt).toLocaleString('en-US')}
            </div>
        </div>
    )
}