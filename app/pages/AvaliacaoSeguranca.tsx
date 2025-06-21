import React, { useState } from 'react'
import { Link } from 'react-router'
import { Shield, AlertTriangle, CheckCircle, Bot, MessageCircle, HeartHandshake } from 'lucide-react'
import { Layout } from '../components/feature/Layout'
import { Button } from '../components/ui/Button'
import { ChatIA } from '../components/feature/ChatIA'



export default function AvaliacaoSeguranca() {
  const [showChat, setShowChat] = useState(false);

  return (
    <Layout hideSOSButton={showChat}>
      <div className="max-w-md mx-auto space-y-4">
        {/* Cabeçalho da página */}
        <div className="text-center py-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-3">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Avaliação de Segurança</h1>
          <p className="text-gray-600 text-sm px-4">
            Análise personalizada da sua situação com orientações específicas
          </p>
        </div>

        {/* Cards de avaliação */}
        <div className="space-y-4">
          {/* Chat com IA */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border">
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mr-4">
                <HeartHandshake className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Converse com Nossa IA</h2>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Faça uma avaliação personalizada conversando com nossa assistente virtual especializada em segurança.
            </p>
            <Button 
              onClick={() => setShowChat(true)}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 font-semibold"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Iniciar Conversa com IA
            </Button>
          </div>

          {/* Avaliação Rápida */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border">
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mr-4">
                <AlertTriangle className="h-6 w-6 text-orange-500" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Avaliação Rápida</h2>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Responda algumas perguntas para receber orientações imediatas sobre sua situação.
            </p>
            <Link to="/avaliacao-rapida">
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 font-semibold">
                Iniciar Avaliação Rápida
              </Button>
            </Link>
          </div>
        </div>

        {/* Informações importantes */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-red-600 mt-0.5" />
            <div>
              <h3 className="font-bold text-red-800 mb-2">
                🚨 Em situação de emergência?
              </h3>
              <p className="text-red-700 text-sm mb-4">
                Se você está em perigo imediato, ligue diretamente para os serviços de emergência.
              </p>
              <div className="space-y-2">
                <p className="font-semibold text-red-800 text-sm">
                  📞 190 - Polícia Militar
                </p>
                <p className="font-semibold text-red-800 text-sm">
                  📞 180 - Central de Atendimento à Mulher
                </p>
                <p className="font-semibold text-red-800 text-sm">
                  📞 192 - SAMU
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Seção de recursos */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Recursos de Segurança
          </h2>
          <div className="space-y-3">
            <div className="flex items-center p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mr-4">
                <Shield className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Plano de Segurança</h3>
                <p className="text-sm text-gray-600">Crie um plano personalizado</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-orange-50 rounded-xl border border-orange-200">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mr-4">
                <AlertTriangle className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Sinais de Alerta</h3>
                <p className="text-sm text-gray-600">Identifique situações de risco</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mr-4">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Lista de Verificação</h3>
                <p className="text-sm text-gray-600">Medidas de proteção</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat IA Modal */}
      {showChat && (
        <ChatIA onClose={() => setShowChat(false)} />
      )}
    </Layout>
  )
} 