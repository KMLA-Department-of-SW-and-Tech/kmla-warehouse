let cookieMutex = {
    occupied: false,
    notAvailable: () => occupied == true,
    lock: () => { 
        if(cookieMutex.notAvailable()) return false;
        cookieMutex.occupied = true;
        return true;
    },
    unlock: () => { cookieMutex.occupied = false; },
}
module.exports = { cookieMutex };