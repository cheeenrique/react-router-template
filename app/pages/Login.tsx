import React, { useState } from 'react'
import { Navigate } from 'react-router'
import { Heart } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'

export default function Login() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Como é um protótipo, qualquer tentativa de login é bem-sucedida
    setIsAuthenticated(true)
  }

  // Redireciona para a página de Avaliação de Segurança após login
  if (isAuthenticated) {
    return <Navigate to="/avaliacao-seguranca" replace />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-auto">
        {/* Logo e título */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 p-3 rounded-full">
              <Heart className="h-12 w-12 text-red-600 fill-current" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Acolher</h1>
          <p className="text-gray-600">
            Sua segurança e bem-estar são nossa prioridade
          </p>
        </div>

        {/* Formulário de login */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="seu.email@exemplo.com"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Sua senha"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg font-semibold"
          >
            Entrar
          </Button>
        </form>

        {/* Informações adicionais */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Este é um protótipo. Qualquer dados inseridos irão permitir o acesso.
          </p>
        </div>

        {/* Links de ajuda */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Precisa de ajuda imediata?</p>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-red-600">Ligue 180 - Central de Atendimento à Mulher</p>
              <p className="text-sm font-semibold text-red-600">Ligue 190 - Polícia Militar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 