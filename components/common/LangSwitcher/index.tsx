"use client"
import useStore from "@/lib/state"
import SwitchWithIcons from "../SwitchWithIcons"

const LangSwitcher = () => {
    const lang = useStore(state => state.lang)
    const setLang = useStore(state => state.setLang)

    const switchLang = () => {
        if (lang === 'es') {
            setLang('en')
            console.log(lang)
        } else {
            setLang('es')
            console.log(lang)
        }
    }

    return (
        <SwitchWithIcons
            onCheckedChange={switchLang}
            leftIcon={<p className="text-lg font-bold">ENG</p>}
            rightIcon={<p className="text-lg font-bold">ESP</p>}
            checked={lang === 'es'}
            text='Idioma'
        />
    )

}

export default LangSwitcher