"use client"
import useStore from "@/lib/state"

type Props = {
    title: string
}

const PageTitleSetter = ({ title }: Props) => {
    const setPageTitle = useStore(state => state.setPageTitle)
    setPageTitle(title)
    return null
}

export default PageTitleSetter;