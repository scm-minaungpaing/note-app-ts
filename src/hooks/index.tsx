import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T| (()=> T)) {
    const [value, setValue] = useState<T>(() => {
        const josnValue = localStorage.getItem(key)
        if ( josnValue == null) {
            if (typeof initialValue === "function") {
                return (initialValue as () => T)()
            } else {
                return initialValue
            }
        } else {
            return JSON.parse(josnValue)
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])

    return [value, setValue] as [T, typeof setValue]
}
