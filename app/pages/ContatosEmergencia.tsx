import React from 'react'
import { Phone, MapPin, Users, AlertTriangle, Clock, Shield, Scale, Heart, Zap } from 'lucide-react'
import { Layout } from '../components/feature/Layout'
import { Button } from '../components/ui/Button'



const priorityContacts = [
  {
    number: '180',
    name: 'Central de Atendimento à Mulher',
    description: 'Orientação, informação e encaminhamento',
    available: '24 horas',
    color: 'bg-pink-500',
    icon: Heart
  },
  {
    number: '190',
    name: 'Polícia Militar',
    description: 'Emergência policial e atendimento imediato',
    available: '24 horas',
    color: 'bg-red-500',
    icon: Shield
  },
  {
    number: '192',
    name: 'SAMU',
    description: 'Atendimento médico de urgência',
    available: '24 horas',
    color: 'bg-blue-500',
    icon: Zap
  }
]

const otherContacts = [
  {
    number: '197',
    name: 'Polícia Civil',
    description: 'Registro de ocorrência e investigação',
    available: '24 horas'
  },
  {
    number: '100',
    name: 'Disque Direitos Humanos',
    description: 'Denúncia de violação de direitos',
    available: '24 horas'
  },
  {
    number: '129',
    name: 'Defensoria Pública',
    description: 'Assistência jurídica gratuita',
    available: 'Horário comercial'
  },
  {
    number: '188',
    name: 'Centro de Valorização da Vida',
    description: 'Apoio emocional e prevenção do suicídio',
    available: '24 horas'
  }
]

export default function ContatosEmergencia() {
  const handleCall = (number: string) => {
    window.open(`tel:${number}`, '_self')
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto space-y-4 px-4">
        {/* Cabeçalho */}
        <div className="text-center py-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-3">
            <Phone className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Contatos de Emergência</h1>
          <p className="text-gray-600 text-sm">
            Acesso rápido aos principais números de ajuda
          </p>
        </div>

        {/* Ativar SOS */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 text-white">
          <div className="flex items-center mb-3">
            <AlertTriangle className="h-6 w-6 mr-2" />
            <h2 className="text-lg font-bold">Ativar SOS</h2>
          </div>
          <p className="text-red-100 text-sm mb-4">Emergência com localização</p>
          <Button 
            className="w-full bg-white text-red-600 hover:bg-gray-100 font-semibold py-3"
            onClick={() => handleCall('190')}
          >
            <Phone className="h-5 w-5 mr-2" />
            EMERGÊNCIA 190
          </Button>
        </div>

        {/* Encontrar Ajuda */}
        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-center mb-3">
            <Users className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-lg font-bold text-gray-900">Encontrar Ajuda</h2>
          </div>
          <p className="text-blue-700 text-sm mb-4">Delegacias e ONGs próximas</p>
          <Button 
            variant="outline" 
            className="w-full border-blue-300 text-blue-700 hover:bg-blue-100"
          >
            <MapPin className="h-4 w-4 mr-2" />
            Localizar Serviços
          </Button>
        </div>

        {/* Números Prioritários */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Números Prioritários</h2>
          <div className="space-y-3">
            {priorityContacts.map((contact) => {
              const IconComponent = contact.icon
              return (
                <div key={contact.number} className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <div className={`flex items-center justify-center w-12 h-12 ${contact.color} rounded-full mr-4`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-2xl font-bold text-gray-900">{contact.number}</span>
                      <div className="flex items-center text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                        <Clock className="h-3 w-3 mr-1" />
                        {contact.available}
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm truncate">{contact.name}</h3>
                    <p className="text-xs text-gray-600 mt-1">{contact.description}</p>
                    <Button 
                      size="sm" 
                      className={`mt-2 w-full ${contact.color} hover:opacity-90 text-white`}
                      onClick={() => handleCall(contact.number)}
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Ligar {contact.number}
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Outros Contatos Úteis */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Outros Contatos Úteis</h2>
          <div className="space-y-3">
            {otherContacts.map((contact) => (
              <div key={contact.number} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xl font-bold text-gray-900">{contact.number}</span>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {contact.available}
                    </div>
                  </div>
                  <h3 className="font-medium text-gray-900 text-sm">{contact.name}</h3>
                  <p className="text-xs text-gray-600">{contact.description}</p>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="ml-3 border-gray-300"
                  onClick={() => handleCall(contact.number)}
                >
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Em caso de perigo imediato */}
        <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
          <div className="flex items-start mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600 mr-3 mt-0.5" />
            <div>
              <h3 className="font-bold text-red-800 mb-2">Em caso de perigo imediato</h3>
              <p className="text-red-700 text-sm">
                Se você está em perigo imediato, ligue 190 (Polícia Militar) ou 192 (SAMU). 
                Para orientação e apoio, o número 180 está disponível 24 horas.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3"
              onClick={() => handleCall('190')}
            >
              <Phone className="h-4 w-4 mr-2" />
              Ligar 190
            </Button>
            <Button 
              className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3"
              onClick={() => handleCall('180')}
            >
              <Phone className="h-4 w-4 mr-2" />
              Ligar 180
            </Button>
          </div>
        </div>

        {/* Dicas de Segurança */}
        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200 mb-6">
          <div className="flex items-center mb-3">
            <Scale className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="font-semibold text-blue-800">💡 Dicas Importantes</h3>
          </div>
          <ul className="space-y-2 text-blue-700 text-sm">
            <li>• Mantenha estes números salvos no seu celular</li>
            <li>• Em emergências, forneça sua localização exata</li>
            <li>• Mantenha a calma e fale de forma clara</li>
            <li>• Todos esses serviços são gratuitos e sigilosos</li>
          </ul>
        </div>
      </div>
    </Layout>
  )
} 