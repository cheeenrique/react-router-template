import React, { useState } from 'react'
import { MapPin, Phone, Search, Clock, Navigation } from 'lucide-react'
import { Layout } from '../components/feature/Layout'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'



interface Service {
  id: number
  name: string
  type: 'delegacia' | 'ong' | 'saude' | 'juridico'
  address: string
  hours: string
  status: 'open' | 'closed'
  distance: string
  phone: string
}

const services: Service[] = [
  {
    id: 1,
    name: 'Delegacia da Mulher - Centro',
    type: 'delegacia',
    address: 'Rua das Flores, 123 - Centro',
    hours: '24h',
    status: 'open',
    distance: '0.8 km',
    phone: '(11) 3333-4444'
  },
  {
    id: 2,
    name: 'Casa da Mulher Brasileira',
    type: 'ong',
    address: 'Av. Paulista, 456 - Bela Vista',
    hours: '8h às 18h',
    status: 'open',
    distance: '1.2 km',
    phone: '(11) 2222-3333'
  },
  {
    id: 3,
    name: 'Centro de Referência da Mulher',
    type: 'ong',
    address: 'Rua da Esperança, 789 - Vila Madalena',
    hours: '9h às 17h',
    status: 'closed',
    distance: '2.1 km',
    phone: '(11) 1111-2222'
  },
  {
    id: 4,
    name: 'Hospital da Mulher',
    type: 'saude',
    address: 'Rua da Saúde, 321 - Liberdade',
    hours: '24h',
    status: 'open',
    distance: '1.5 km',
    phone: '(11) 4444-5555'
  },
  {
    id: 5,
    name: 'Defensoria Pública da Mulher',
    type: 'juridico',
    address: 'Largo São Bento, 654 - Centro',
    hours: '8h às 16h',
    status: 'open',
    distance: '2.3 km',
    phone: '(11) 5555-6666'
  }
]

const filterOptions = [
  { id: 'todos', label: 'Todos', color: 'bg-purple-500' },
  { id: 'delegacia', label: 'Delegacias', color: 'bg-blue-500' },
  { id: 'ong', label: 'ONGs', color: 'bg-pink-500' },
  { id: 'saude', label: 'Saúde', color: 'bg-green-500' },
  { id: 'juridico', label: 'Jurídico', color: 'bg-orange-500' }
]

const getTypeColor = (type: string) => {
  switch (type) {
    case 'delegacia': return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'ong': return 'bg-pink-100 text-pink-800 border-pink-200'
    case 'saude': return 'bg-green-100 text-green-800 border-green-200'
    case 'juridico': return 'bg-orange-100 text-orange-800 border-orange-200'
    default: return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getTypeName = (type: string) => {
  switch (type) {
    case 'delegacia': return 'Delegacia'
    case 'ong': return 'ONG'
    case 'saude': return 'Saúde'
    case 'juridico': return 'Jurídico'
    default: return type
  }
}

export default function RedeApoio() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('todos')

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.address.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = activeFilter === 'todos' || service.type === activeFilter
    return matchesSearch && matchesFilter
  })

  return (
    <Layout>
      <div className="max-w-md mx-auto space-y-4">
        {/* Barra de Busca */}
        
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-600" />
            <Input
              type="text"
              placeholder="Buscar por nome ou endereço..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border rounded-xl font-medium text-gray-900 placeholder-gray-600 focus:ring-2 focus:ring-purple-500"
            />
          </div>
        

        {/* Filtros */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {filterOptions.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === filter.id
                  ? `${filter.color} text-white shadow-lg`
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Card de Emergência */}
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-red-500 rounded-full mr-4">
              <Phone className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-red-900 mb-1">Em caso de emergência</h3>
              <p className="text-sm text-red-700">
                Ligue 180 (Central de Atendimento à Mulher) ou 190 (Polícia)
              </p>
            </div>
          </div>
        </div>

        {/* Lista de Serviços */}
        <div className="space-y-4">
          {filteredServices.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhum serviço encontrado</p>
            </div>
          ) : (
            filteredServices.map((service) => (
              <div key={service.id} className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-base mb-1">{service.name}</h3>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(service.type)}`}>
                      {getTypeName(service.type)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-600">{service.distance}</span>
                  </div>
                </div>

                {/* Informações */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{service.address}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{service.hours}</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      service.status === 'open' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {service.status === 'open' ? 'Aberto agora' : 'Fechado'}
                    </span>
                  </div>
                </div>

                                 {/* Botões de Ação */}
                 <div className="flex space-x-3">
                   <a
                     href={`tel:${service.phone}`}
                     className="flex-1 bg-green-500 hover:bg-green-600 text-white text-center py-2 rounded-md font-semibold text-sm transition-colors duration-200 flex items-center justify-center space-x-2"
                   >
                     <Phone className="h-4 w-4" />
                     <span>Ligar</span>
                   </a>
                  <button
                    onClick={() => {
                      // Simular navegação
                      window.open(`https://maps.google.com/search/${encodeURIComponent(service.address)}`, '_blank')
                    }}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-center py-2 rounded-md font-semibold text-sm transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <Navigation className="h-4 w-4" />
                    <span>Ir até lá</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Informação sobre localização */}
        {filteredServices.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
            <p className="text-sm text-blue-800">
              <strong>📍 Localização baseada no seu GPS.</strong> Mantemos sua privacidade protegida.
            </p>
          </div>
        )}
      </div>
    </Layout>
  )
} 