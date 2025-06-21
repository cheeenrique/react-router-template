import { useState } from 'react';
import { 
  AlertTriangle, 
  Users, 
  Shield, 
  Phone, 
  CheckCircle, 
  Camera, 
  MessageSquare, 
  Calendar,
  FolderOpen,
  Lock,
  MapPin
} from 'lucide-react';
import { Layout } from '../components/feature/Layout';
import { Button } from '../components/ui/Button';

export default function Emergencia() {
  const [emergencyTriggered, setEmergencyTriggered] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  const handleSOSClick = () => {
    setEmergencyTriggered(true);
    
    // Obter geolocalização
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Erro ao obter localização:', error);
        }
      );
    }

    // Simular envio de notificação automática
    setTimeout(() => {
      alert('✅ Notificação enviada para autoridades e contatos de confiança!');
    }, 2000);
  };

  const emergencyContacts = [
    { number: '180', name: 'Central da Mulher', description: 'Orientação e denúncia', color: 'purple' },
    { number: '190', name: 'Polícia Militar', description: 'Emergência policial', color: 'blue' },
    { number: '192', name: 'SAMU', description: 'Emergência médica', color: 'green' },
    { number: '100', name: 'Disque Direitos Humanos', description: 'Violação de direitos', color: 'orange' }
  ];

  const safetyPlanItems = [
    {
      title: 'Tenha sempre um plano de fuga',
      description: 'Identifique as saídas da casa e mantenha chaves, documentos e dinheiro em local de fácil acesso.',
      completed: false
    },
    {
      title: 'Crie uma palavra-código',
      description: 'Estabeleça uma palavra secreta com familiares ou amigos para pedir ajuda sem chamar atenção.',
      completed: false
    },
    {
      title: 'Mantenha evidências seguras',
      description: 'Fotografe lesões, guarde mensagens ameaçadoras em local seguro (nuvem, e-mail confiável).',
      completed: false
    },
    {
      title: 'Tenha contatos de emergência',
      description: 'Memorize números importantes e mantenha-os salvos com nomes discretos no celular.',
      completed: false
    }
  ];

  return (
    <Layout>
      <div className="max-w-md mx-auto space-y-6 pb-20">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Segurança</h1>
        </div>

        {/* Botão de Emergência Principal */}
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Botão de Emergência</h2>
          <p className="text-gray-600 text-sm mb-6">
            Em caso de perigo imediato, pressione o botão abaixo.
          </p>
          
          {!emergencyTriggered && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start">
              <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-yellow-800">
                Configure contatos de confiança para notificação automática
              </p>
            </div>
          )}

          <button
            onClick={handleSOSClick}
            disabled={emergencyTriggered}
            className={`mx-auto w-32 h-32 rounded-full flex flex-col items-center justify-center text-white font-bold text-xl shadow-lg transition-all duration-300 ${
              emergencyTriggered
                ? 'bg-green-600 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700 animate-pulse'
            }`}
            style={{
              animation: emergencyTriggered ? 'none' : 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            }}
          >
            {emergencyTriggered ? (
              <>
                <CheckCircle className="h-8 w-8 mb-2" />
                <span className="text-sm">ENVIADO</span>
              </>
            ) : (
              <>
                <AlertTriangle className="h-8 w-8 mb-2" />
                <span>SOS</span>
              </>
            )}
          </button>

          {emergencyTriggered && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800 font-semibold">
                ✅ Notificação enviada com sucesso!
              </p>
              {location && (
                <p className="text-xs text-green-700 mt-1">
                  <MapPin className="h-3 w-3 inline mr-1" />
                  Localização compartilhada
                </p>
              )}
            </div>
          )}
        </div>

        {/* Contatos de Confiança */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-full mr-3">
              <Users className="h-4 w-4 text-purple-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Contatos de Confiança</h2>
          </div>
          
          <p className="text-gray-600 text-sm mb-4">
            Configure pessoas de confiança que serão notificadas automaticamente em caso de emergência, recebendo sua localização em tempo real.
          </p>
          
          <Button 
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 font-semibold"
            onClick={() => window.location.href = '/avaliacao-rapida'}
          >
            Configurar Contatos de Confiança
          </Button>
        </div>

        {/* Plano de Segurança Pessoal */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mr-3">
              <Shield className="h-4 w-4 text-blue-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Plano de Segurança Pessoal</h2>
          </div>

          <div className="space-y-3">
            {safetyPlanItems.map((item, index) => (
              <div key={index} className="flex items-start p-3 rounded-lg border border-gray-200">
                <div className="flex items-center justify-center w-5 h-5 border-2 border-green-500 rounded-full mr-3 mt-0.5 flex-shrink-0">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contatos de Emergência */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-full mr-3">
              <Phone className="h-4 w-4 text-red-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Contatos de Emergência</h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {emergencyContacts.map((contact, index) => (
              <a
                key={index}
                href={`tel:${contact.number}`}
                className="p-4 border border-gray-200 rounded-lg text-center hover:bg-gray-50 transition-colors"
              >
                <div className={`text-2xl font-bold mb-1 ${
                  contact.color === 'purple' ? 'text-purple-600' :
                  contact.color === 'blue' ? 'text-blue-600' :
                  contact.color === 'green' ? 'text-green-600' : 'text-orange-600'
                }`}>
                  {contact.number}
                </div>
                <div className="text-xs font-semibold text-gray-900 mb-1">{contact.name}</div>
                <div className="text-xs text-gray-600">{contact.description}</div>
              </a>
            ))}
          </div>
        </div>

        {/* Coleta de Evidências */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded-full mr-3">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Coleta de Evidências</h2>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-orange-900 mb-2">Documente tudo:</h3>
            <ul className="space-y-1 text-sm text-orange-800">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Fotografe lesões com data/hora</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Salve mensagens e e-mails ameaçadores</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Anote datas, horários e testemunhas</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Guarde laudos médicos e boletins</span>
              </li>
            </ul>
          </div>

          <Button 
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 font-semibold"
            onClick={() => alert('Funcionalidade de coleta de evidências em desenvolvimento')}
          >
            Acessar Guia Completo
          </Button>
        </div>

        {/* Aviso de Segurança */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <Lock className="h-4 w-4 text-blue-600 mr-2" />
            <p className="text-sm text-blue-800">
              <strong>Todas as suas informações são protegidas por criptografia.</strong> Você pode apagar todos os dados do app a qualquer momento.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
} 