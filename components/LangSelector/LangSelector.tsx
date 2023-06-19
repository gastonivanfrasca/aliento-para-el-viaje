"use client";
import {
  useContextReducerState,
  useContextReducerDispatch
} from "@/hooks/useContextReducer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { LANGS } from "@/lib/lang/types";
import { LOCAL_STORAGE_KEY } from "@/lib/lang/types";

export function LangSelector({
}: any) {
  const dispatch = useContextReducerDispatch()
  const { lang } = useContextReducerState()
  return (
    <Select value={lang} onValueChange={
      (value) => {
        dispatch({ type: "SET_LANG", payload: value })
        window.localStorage.setItem(LOCAL_STORAGE_KEY, value)
      }
    }>
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Lenguaje</SelectLabel>
          <SelectItem value={LANGS.ES} >Español</SelectItem>
          <SelectItem value={LANGS.EN} >English</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default LangSelector
