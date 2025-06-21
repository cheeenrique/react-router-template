import { useState } from 'react';
import { ArrowLeft, ArrowRight, Shield, Users, Phone, Check, AlertTriangle, Info } from 'lucide-react';
import { Layout } from '../components/feature/Layout';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

// Baseado no formulário oficial de avaliação de risco do DF
const questions = [
  // BLOCO I - Fatores de Risco Históricos
  {
    id: 1,
    block: 'I',
    question: "Você já foi vítima de violência doméstica anteriormente?",
    options: [
      { text: "Não", riskScore: 0 },
      { text: "Sim, uma vez", riskScore: 1 },
      { text: "Sim, algumas vezes", riskScore: 1 },
      { text: "Sim, muitas vezes", riskScore: 1 },
      { text: "Não sei", riskScore: 0 }
    ]
  },
  {
    id: 2,
    block: 'I',
    question: "Seu parceiro/ex-parceiro já usou ou ameaçou usar arma de fogo contra você?",
    options: [
      { text: "Não", riskScore: 0 },
      { text: "Sim, ameaçou", riskScore: 1 },
      { text: "Sim, usou", riskScore: 1 },
      { text: "Não sei", riskScore: 0 }
    ]
  },
  {
    id: 3,
    block: 'I',
    question: "Seu parceiro/ex-parceiro já usou ou ameaçou usar faca ou outro objeto cortante?",
    options: [
      { text: "Não", riskScore: 0 },
      { text: "Sim, ameaçou", riskScore: 1 },
      { text: "Sim, usou", riskScore: 1 },
      { text: "Não sei", riskScore: 0 }
    ]
  },
  {
    id: 4,
    block: 'I',
    question: "Seu parceiro/ex-parceiro já causou lesões que necessitaram atendimento médico?",
    options: [
      { text: "Não", riskScore: 0 },
      { text: "Sim, uma vez", riskScore: 1 },
      { text: "Sim, mais de uma vez", riskScore: 1 },
      { text: "Não sei", riskScore: 0 }
    ]
  },
  // BLOCO II - Fatores de Risco Situacionais
  {
    id: 5,
    block: 'II',
    question: "Seu parceiro/ex-parceiro demonstra ciúme excessivo ou possessividade?",
    options: [
      { text: "Não", riskScore: 0 },
      { text: "Às vezes", riskScore: 0 },
      { text: "Frequentemente", riskScore: 1 },
      { text: "Sempre", riskScore: 1 },
      { text: "Não sei", riskScore: 0 }
    ]
  },
  {
    id: 6,
    block: 'II',
    question: "Seu parceiro/ex-parceiro controla suas atividades diárias, quem você vê, com quem fala ou onde vai?",
    options: [
      { text: "Não", riskScore: 0 },
      { text: "Às vezes", riskScore: 0 },
      { text: "Frequentemente", riskScore: 1 },
      { text: "Sempre", riskScore: 1 },
      { text: "Não sei", riskScore: 0 }
    ]
  },
  {
    id: 7,
    block: 'II',
    question: "Seu parceiro/ex-parceiro usa drogas ou álcool com frequência?",
    options: [
      { text: "Não", riskScore: 0 },
      { text: "Ocasionalmente", riskScore: 0 },
      { text: "Frequentemente", riskScore: 1 },
      { text: "Diariamente", riskScore: 1 },
      { text: "Não sei", riskScore: 0 }
    ]
  },
  {
    id: 8,
    block: 'II',
    question: "A violência tem aumentado em frequência ou gravidade recentemente?",
    options: [
      { text: "Não", riskScore: 0 },
      { text: "Mantém-se igual", riskScore: 0 },
      { text: "Sim, aumentou", riskScore: 1 },
      { text: "Não sei", riskScore: 0 }
    ]
  },
  // BLOCO III - Fatores de Risco Contextuais
  {
    id: 9,
    block: 'III',
    question: "Seu parceiro/ex-parceiro tem acesso a armas?",
    options: [
      { text: "Não", riskScore: 0 },
      { text: "Sim, arma branca", riskScore: 1 },
      { text: "Sim, arma de fogo", riskScore: 1 },
      { text: "Não sei", riskScore: 0 }
    ]
  },
  {
    id: 10,
    block: 'III',
    question: "Vocês têm filhos menores de idade em comum?",
    options: [
      { text: "Não", riskScore: 0 },
      { text: "Sim", riskScore: 1 },
      { text: "Estou grávida", riskScore: 1 }
    ]
  },
  {
    id: 11,
    block: 'III',
    question: "Seu parceiro/ex-parceiro já ameaçou se suicidar ou machucar outros se você o deixar?",
    options: [
      { text: "Não", riskScore: 0 },
      { text: "Sim, ameaçou suicídio", riskScore: 1 },
      { text: "Sim, ameaçou machucar outros", riskScore: 1 },
      { text: "Ambos", riskScore: 1 },
      { text: "Não sei", riskScore: 0 }
    ]
  },
  {
    id: 12,
    block: 'III',
    question: "Você tem medo que seu parceiro/ex-parceiro possa matá-la?",
    options: [
      { text: "Não", riskScore: 0 },
      { text: "Às vezes", riskScore: 0 },
      { text: "Sim, tenho medo", riskScore: 1 },
      { text: "Não sei", riskScore: 0 }
    ]
  }
];

type RiskLevel = 'baixo' | 'moderado' | 'alto' | 'critico';

interface RiskAssessment {
  score: number;
  level: RiskLevel;
  message: string;
  recommendations: string[];
}

export default function AvaliacaoRapida() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showRiskResult, setShowRiskResult] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [savedContacts, setSavedContacts] = useState<Array<{name: string, phone: string}>>([]);
  const [showCompleted, setShowCompleted] = useState(false);

  // Calcula a pontuação de risco
  const calculateRiskScore = (): RiskAssessment => {
    let totalScore = 0;
    
    questions.forEach(question => {
      const answer = answers[question.id];
      if (answer) {
        const selectedOption = question.options.find(opt => opt.text === answer);
        if (selectedOption) {
          totalScore += selectedOption.riskScore;
        }
      }
    });

    // Classifica o risco baseado na pontuação (máximo 12 pontos nos blocos I, II e III)
    let level: RiskLevel;
    let message: string;
    let recommendations: string[];

    if (totalScore === 0) {
      level = 'baixo';
      message = 'Com base em suas respostas, sua situação atual parece relativamente segura. Mesmo assim, é importante estar sempre atenta e conhecer seus direitos.';
      recommendations = [
        'Mantenha contatos de emergência sempre acessíveis',
        'Conheça seus direitos e recursos disponíveis',
        'Participe de grupos de apoio preventivo'
      ];
    } else if (totalScore <= 3) {
      level = 'moderado';
      message = 'Suas respostas indicam alguns fatores de risco presentes. É importante buscar orientação e apoio especializado.';
      recommendations = [
        'Configure contatos de confiança imediatamente',
        'Busque orientação com profissionais especializados',
        'Considere elaborar um plano de segurança',
        'Mantenha documentos importantes organizados'
      ];
    } else if (totalScore <= 6) {
      level = 'alto';
      message = 'Sua situação apresenta fatores de risco significativos. É fundamental buscar ajuda profissional urgente.';
      recommendations = [
        'URGENTE: Configure contatos de emergência',
        'Procure imediatamente a Delegacia da Mulher',
        'Considere solicitar medidas protetivas',
        'Elabore um plano de segurança detalhado',
        'Busque abrigo seguro se necessário'
      ];
    } else {
      level = 'critico';
      message = 'ATENÇÃO: Sua situação apresenta risco elevado de violência grave. Busque ajuda profissional IMEDIATAMENTE.';
      recommendations = [
        'EMERGÊNCIA: Ligue 190 se estiver em perigo imediato',
        'Configure contatos de emergência AGORA',
        'Procure URGENTEMENTE a Delegacia da Mulher',
        'Solicite medidas protetivas de urgência',
        'Considere abrigo temporário',
        'Não hesite em buscar ajuda profissional'
      ];
    }

    return { score: totalScore, level, message, recommendations };
  };

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowRiskResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleContinueToContacts = () => {
    setShowRiskResult(false);
    setShowContacts(true);
  };

  const handleSaveContact = () => {
    if (contactName.trim() && contactPhone.trim()) {
      setSavedContacts(prev => [...prev, { name: contactName.trim(), phone: contactPhone.trim() }]);
      setContactName('');
      setContactPhone('');
    }
  };

  const handleFinish = () => {
    setShowCompleted(true);
  };

  // Tela de resultado da avaliação de risco
  if (showRiskResult) {
    const riskAssessment = calculateRiskScore();
    const riskColors = {
      baixo: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', icon: 'text-green-600' },
      moderado: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800', icon: 'text-yellow-600' },
      alto: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-800', icon: 'text-orange-600' },
      critico: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', icon: 'text-red-600' }
    };

    const colors = riskColors[riskAssessment.level];

    return (
      <Layout>
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-center mb-6">
              <div className={`flex items-center justify-center w-16 h-16 ${colors.bg} rounded-full mx-auto mb-4`}>
                {riskAssessment.level === 'baixo' ? (
                  <Check className={`h-8 w-8 ${colors.icon}`} />
                ) : (
                  <AlertTriangle className={`h-8 w-8 ${colors.icon}`} />
                )}
              </div>
              <h1 className="text-xl font-bold text-gray-900 mb-2">
                Situação de {riskAssessment.level === 'baixo' ? 'Baixo' : 
                            riskAssessment.level === 'moderado' ? 'Moderado' :
                            riskAssessment.level === 'alto' ? 'Alto' : 'Crítico'} Risco
              </h1>
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-2">Pontuação da Avaliação</div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${
                      riskAssessment.level === 'baixo' ? 'bg-green-500' :
                      riskAssessment.level === 'moderado' ? 'bg-yellow-500' :
                      riskAssessment.level === 'alto' ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min((riskAssessment.score / 12) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="text-right text-sm text-gray-600 mt-1">
                  {riskAssessment.score}/12
                </div>
              </div>
            </div>

            <div className={`${colors.bg} ${colors.border} border rounded-lg p-4 mb-6`}>
              <p className={`text-sm ${colors.text} mb-4`}>
                {riskAssessment.message}
              </p>
              
              <div>
                <h3 className={`font-semibold ${colors.text} mb-2`}>Recomendações:</h3>
                <ul className="space-y-1">
                  {riskAssessment.recommendations.map((rec, index) => (
                    <li key={index} className={`text-xs ${colors.text} flex items-start`}>
                      <span className="mr-2">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <Info className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-800 font-semibold mb-2">Importante:</p>
                  <p className="text-xs text-blue-700">
                    Independentemente do resultado desta avaliação, se você estiver em perigo imediato, 
                    ligue 190 (Polícia Militar) ou 180 (Central de Atendimento à Mulher).
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={handleContinueToContacts}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold"
            >
              Configurar Contatos de Confiança
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  if (showCompleted) {
    const riskAssessment = calculateRiskScore();
    
    return (
      <Layout>
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-6">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-4">Avaliação Concluída</h1>
            <p className="text-gray-600 text-sm mb-6">
              Sua avaliação foi registrada com sucesso e seus contatos de confiança foram configurados.
            </p>
            
            <div className="space-y-3 mb-6">
              {riskAssessment.level !== 'baixo' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-800 font-medium">• Mantenha contatos de emergência sempre acessíveis</p>
                </div>
              )}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800 font-medium">• Considere conversar com profissionais especializados</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm text-green-800 font-medium">• Explore os recursos educativos disponíveis</p>
              </div>
            </div>

            <Button
              onClick={() => window.history.back()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold"
            >
              Voltar ao Menu
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  if (showContacts) {
    return (
      <Layout>
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mr-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Contatos de Confiança</h1>
                <p className="text-gray-600 text-sm">Configure pessoas que serão notificadas em emergências</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                <Input
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Digite o nome do contato"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                <Input
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="Digite o número do telefone"
                  type="tel"
                  className="w-full"
                />
              </div>
              <Button
                onClick={handleSaveContact}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 font-semibold"
              >
                Salvar Contato
              </Button>
            </div>

            {savedContacts.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Contatos Salvos:</h3>
                <div className="space-y-2">
                  {savedContacts.map((contact, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3 flex items-center">
                      <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full mr-3">
                        <Phone className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                        <p className="text-xs text-gray-600">{contact.phone}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Importante:</strong> Em caso de emergência, estes contatos receberão automaticamente sua localização em tempo real.
              </p>
            </div>

            <Button
              onClick={handleFinish}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 font-semibold"
            >
              Finalizar Configuração
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const currentQuestion = questions[currentStep];
  const currentAnswer = answers[currentQuestion.id];

  return (
    <Layout>
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mr-4">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Avaliação Rápida</h1>
              <p className="text-gray-600 text-sm">Etapa {currentStep + 1} de {questions.length} • Bloco {currentQuestion.block}</p>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">{currentQuestion.question}</h2>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(currentQuestion.id, option.text)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  currentAnswer === option.text
                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    currentAnswer === option.text
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {currentAnswer === option.text && (
                      <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                    )}
                  </div>
                  <span className="text-sm font-medium">{option.text}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex space-x-4">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            variant="outline"
            className="flex-1 py-3 font-semibold disabled:opacity-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Anterior
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!currentAnswer}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold disabled:opacity-50"
          >
            {currentStep === questions.length - 1 ? 'Calcular Risco' : 'Próxima'}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {/* Info Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start">
            <Info className="h-4 w-4 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-amber-800">
                <strong>Confidencial:</strong> Suas respostas são privadas e serão usadas apenas para avaliar sua situação de risco e fornecer recomendações adequadas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 