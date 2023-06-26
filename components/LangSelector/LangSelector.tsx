"use client";
import {
  useContextReducerState,
  useContextReducerDispatch,
  ACTIONS
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
import { getDictionary, getWording } from "@/lib/dict";

export function LangSelector({
}: any) {
  const dispatch = useContextReducerDispatch()
  const { lang } = useContextReducerState()
  return (
    <Select value={lang} onValueChange={
      (value) => {
        dispatch({ type: ACTIONS.SET_LANG, payload: value as LANGS })
        dispatch({ type: ACTIONS.SET_DICTIONARY, payload: getDictionary(value as LANGS) })
        window.localStorage.setItem(LOCAL_STORAGE_KEY, value)
      }
    }>
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{getWording(lang, "menu.selectLanguage")}</SelectLabel>
          <SelectItem value={LANGS.ES} >{getWording(lang, "menu.languages.spanish")}</SelectItem>
          <SelectItem value={LANGS.EN} >{getWording(lang, "menu.languages.english")}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default LangSelector
