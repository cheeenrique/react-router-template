import React, { useState } from 'react'
import { BookOpen, Search, Filter, ChevronDown, ChevronUp, Scale, Shield, AlertTriangle, FileText, Users, Heart } from 'lucide-react'
import { Layout } from '../components/feature/Layout'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'



const lawsData = [
  {
    id: 1,
    title: "Lei Maria da Penha",
    subtitle: "Lei 11.340/2006",
    description: "Cria mecanismos para coibir a violência doméstica e familiar contra a mulher.",
    details: [
      "Tipifica e define a violência doméstica e familiar contra a mulher",
      "Estabelece medidas protetivas de urgência",
      "Cria Juizados de Violência Doméstica e Familiar",
      "Altera o Código Penal e a Lei de Execução Penal"
    ],
    icon: Shield,
    color: "blue"
  },
  {
    id: 2,
    title: "Lei do Feminicídio",
    subtitle: "Lei 13.104/2015",
    description: "Altera o Código Penal para incluir o feminicídio como crime hediondo.",
    details: [
      "Feminicídio é crime contra a vida da mulher por razões de gênero",
      "Pena de 12 a 30 anos de reclusão",
      "Circunstâncias qualificadoras aumentam a pena",
      "Crime hediondo, sem direito à fiança ou anistia"
    ],
    icon: Scale,
    color: "red"
  },
  {
    id: 3,
    title: "Lei de Importunação Sexual",
    subtitle: "Lei 13.718/2018",
    description: "Tipifica os crimes de importunação sexual e divulgação de cena de estupro.",
    details: [
      "Importunação sexual sem consentimento",
      "Pena de 1 a 5 anos de reclusão",
      "Registro de imagens íntimas sem autorização",
      "Divulgação de cenas de estupro"
    ],
    icon: AlertTriangle,
    color: "purple"
  }
]

const violenceTypes = [
  {
    type: "Física",
    description: "Agressões que causam lesão corporal",
    color: "red"
  },
  {
    type: "Psicológica", 
    description: "Ameaças, humilhações, controle",
    color: "orange"
  },
  {
    type: "Sexual",
    description: "Forçar atividade sexual sem consentimento",
    color: "purple"
  },
  {
    type: "Patrimonial",
    description: "Controlar ou destruir bens",
    color: "blue"
  },
  {
    type: "Moral",
    description: "Calúnia, difamação, injúria",
    color: "green"
  }
]

const abusiveSigns = [
  "Controle excessivo das atividades e contatos",
  "Isolamento de família e amigos",
  "Ciúmes possessivos e acusações infundadas",
  "Controle do dinheiro e decisões",
  "Ameaças e intimidações constantes"
]

const helpSteps = [
  "Procure uma Delegacia da Mulher",
  "Entre em contato com organizações especializadas",
  "Busque apoio psicológico",
  "Documente as violências sofridas",
  "Informe pessoas de confiança sobre sua situação"
]

export default function RecursosEducativos() {
  const [activeSection, setActiveSection] = useState('leis')
  const [expandedLaws, setExpandedLaws] = useState<number[]>([])

  const toggleLawExpanded = (id: number) => {
    setExpandedLaws(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600 border-blue-200",
      red: "bg-red-100 text-red-600 border-red-200",
      purple: "bg-purple-100 text-purple-600 border-purple-200",
      orange: "bg-orange-100 text-orange-600 border-orange-200",
      green: "bg-green-100 text-green-600 border-green-200"
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto space-y-6">
        {/* Cabeçalho */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <BookOpen className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Recursos Educativos</h1>
          <p className="text-gray-600 text-sm px-4">
            Informações sobre seus direitos e leis de proteção
          </p>
        </div>

        {/* Navegação por seções */}
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setActiveSection('leis')}
              className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                activeSection === 'leis'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Scale className="h-4 w-4 mx-auto mb-1" />
              Leis e Direitos
            </button>
            <button
              onClick={() => setActiveSection('orientacoes')}
              className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                activeSection === 'orientacoes'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Heart className="h-4 w-4 mx-auto mb-1" />
              Orientações
            </button>
          </div>
        </div>

        {/* Seção de Leis e Direitos */}
        {activeSection === 'leis' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 px-4">Leis e Direitos</h2>
            
            {lawsData.map((law) => {
              const IconComponent = law.icon
              const isExpanded = expandedLaws.includes(law.id)
              
              return (
                <div key={law.id} className="bg-white rounded-2xl shadow-lg border">
                  <div 
                    className="p-4 cursor-pointer"
                    onClick={() => toggleLawExpanded(law.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full ${getColorClasses(law.color)}`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{law.title}</h3>
                        <p className="text-sm text-gray-500 font-medium">{law.subtitle}</p>
                        <p className="text-sm text-gray-600 mt-1">{law.description}</p>
                      </div>
                      <div className="ml-2">
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-gray-100">
                      <div className="mt-3 space-y-2">
                        {law.details.map((detail, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-sm text-gray-700">{detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Seção de Orientações */}
        {activeSection === 'orientacoes' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-gray-900 px-4">Orientações</h2>
            
            {/* Tipos de Violência */}
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                Tipos de Violência
              </h3>
              <div className="space-y-3">
                {violenceTypes.map((violence, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${getColorClasses(violence.color)}`}>
                    <h4 className="font-semibold text-sm">{violence.type}</h4>
                    <p className="text-xs mt-1 opacity-80">{violence.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sinais de Relacionamento Abusivo */}
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <Shield className="h-5 w-5 text-orange-500 mr-2" />
                Sinais de Relacionamento Abusivo
              </h3>
              <div className="space-y-2">
                {abusiveSigns.map((sign, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">{sign}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Como Buscar Ajuda */}
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <Users className="h-5 w-5 text-green-500 mr-2" />
                Como Buscar Ajuda
              </h3>
              <div className="space-y-3">
                {helpSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex items-center justify-center w-6 h-6 bg-green-100 text-green-600 rounded-full text-xs font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-sm text-gray-700">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Informação importante */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <div className="flex items-start space-x-3">
            <FileText className="h-6 w-6 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-bold text-blue-800 mb-2">
                💡 Importante
              </h3>
              <p className="text-blue-700 text-sm">
                O conhecimento dos seus direitos é fundamental para sua proteção. 
                Em caso de dúvidas, procure sempre orientação jurídica especializada.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
} 