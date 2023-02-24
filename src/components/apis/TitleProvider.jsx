

let isMounted = false;

window.addEventListener('load', () => {
    isMounted = true
})

export const tableFilter = (event, tableIndex) => {
    const table = document.querySelectorAll('table')[tableIndex - 1]

    if (table) {
        const trs = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr')

        if (trs) {
            for (const index in trs) {

                const text = trs[index].innerText || trs[index].innerHTML
                if (text && text.includes('Totals')) {
                    break
                } else if (text && text.toLowerCase().includes(event.target.value.toLowerCase())) {
                    trs[index].style.display = ""
                } else {
                    trs[index].style.display = "none"
                }
            }
        }
    }
}

export const TitleProvider = ({ titleText }) => {
    const _interval = setInterval(() => {
        if (isMounted) {
            document.querySelector('title').innerText = titleText
            clearInterval(_interval)

            const tables = document.querySelectorAll('table.datatable.notset')

            if (tables) {
                tables.forEach(element => {

                });
            }
        }
    })
}

export const CurrencyFormatter = (money) => {
    const parts = (""+money).toString().split(".")

    if (parts.length > 1) {
        if (Number(parts[1]) >= 500) {
            parts[0] = (Number(parts[0]) + 1) + ""
        }
    }

    parts[0] = str_rev(parts[0])

    let fstring = ""

    for (let i = 0; i < parts[0].length; i++) {
        if (i % 3 === 0) {
            fstring += "," + parts[0][i]
        } else {
            fstring += parts[0][i]
        }
    }

    fstring = fstring.startsWith(',') ? fstring.substring(1) : fstring;
    parts[0] = str_rev(fstring)

    return parts[0]
}

const str_rev = (string) => {
    let fstring = ""

    for (let i = string.length - 1; i >= 0; i--) {
        fstring += string[i]
    }

    return fstring
}

export const PersistenceAPI = () => {
    const user = localStorage.getItem('user')

    return user ? JSON.parse(user) : null
}

export const domSelector = (selector)=>{
    return document.querySelector(selector)
}