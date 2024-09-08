import { ChangeEvent, FormEvent, useState } from "react"
import { createPortal } from "react-dom"
import { useGetCategoriesQuery } from "../api/categoryApi"
import { useCreateItemMutation } from "../api/itemApi"

type Props = {
  isOpen?: boolean
  close: () => void
}

const initialData = {
  categoryId: "",
  price: "",
  name: "",
}

export default function CreateModal({ isOpen, close }: Props) {
  const [data, setData] = useState(initialData)
  const categoriesQuery = useGetCategoriesQuery()
  const [createItem] = useCreateItemMutation()

  const changeHandler = (e: ChangeEvent<any>) => {
    if (Object.keys(data).includes(e.target.name)) {
      setData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }))
    }
  }

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (data.categoryId && data.name) {
      try {
        const res = await createItem({
          ...data,
          categoryId: +data.categoryId,
        })
        if (res) {
          setData(initialData)
          close()
        }
      } catch (err) {
        console.error("Failed to create a new item")
      }
    }
  }

  return createPortal(
    <div className="modal-container">
      <div className="modal">
        <button onClick={close}>Закрыть</button>
        <form autoComplete="off" onSubmit={submitHandler}>
          {!!categoriesQuery.data && (
            <select
              value={data.categoryId ?? null}
              name="categoryId"
              onChange={changeHandler}
              required
            >
              <option value="" disabled selected hidden>
                Выберите категорию
              </option>
              {categoriesQuery.data.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          )}
          <input
            name="name"
            placeholder="Наименование"
            value={data.name}
            onChange={changeHandler}
            required
          />
          <input
            name="price"
            placeholder="Цена"
            type="number"
            value={data.price}
            onChange={changeHandler}
            required
          />
          <button type="submit">Создать</button>
        </form>
      </div>
    </div>,
    document.body,
  )
}
