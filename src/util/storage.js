const ADMIN_INFO = 'ADMIN_INFO' 

const storage = {
    get() {
        return JSON.parse(localStorage.getItem(ADMIN_INFO)) || null
    },
    set(user) {
        localStorage.setItem(ADMIN_INFO, JSON.stringify(user))
    }
}

export default storage