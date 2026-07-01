import '../styles/search-bar.css'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  id?: string
}

export function SearchBar({ value, onChange, placeholder, id }: SearchBarProps) {
  return (
    <input
      type="search"
      id={id}
      className="search-bar"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      autoComplete="off"
      aria-label="Rechercher"
    />
  )
}
