import React, { useState, useEffect } from 'react'
import './App.css'

const App = () => {
  const [rates, setRates] = useState({})
  const [baseCurrency, setBaseCurrency] = useState('USD')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch(
          `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setRates(data.rates)
        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }

    fetchRates()
  }, [baseCurrency])

  const handleCurrencyChange = (e) => {
    setBaseCurrency(e.target.value)
    setLoading(true)
  }

  return (
    <div className="app">
      <h1>Курсы валют</h1>
      <select onChange={handleCurrencyChange} value={baseCurrency}>
        <option value="USD">Доллар США (USD)</option>
        <option value="EUR">Евро (EUR)</option>
        <option value="RUB">Российский рубль (RUB)</option>
        {/* Добавьте больше валют по необходимости */}
      </select>

      {loading && <p>Загрузка...</p>}
      {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}

      <ul>
        {Object.entries(rates).map(([currency, rate]) => (
          <li key={currency}>
            {currency}: {rate}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
