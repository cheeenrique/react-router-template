import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, MessageCircle, Heart, Shield, AlertTriangle, Phone, Users, HeartHandshake } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Link } from 'react-router';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatIAProps {
  onClose: () => void;
}

// Perguntas do questionário de avaliação rápida adaptadas para chat
const avaliacaoPerguntas = [
  {
    id: 1,
    pergunta: "Você já foi vítima de violência doméstica anteriormente?",
    opcoes: ["Não", "Sim, uma vez", "Sim, algumas vezes", "Sim, muitas vezes", "Não sei"],
    riscos: [0, 1, 1, 1, 0]
  },
  {
    id: 2,
    pergunta: "Seu parceiro/ex-parceiro já usou ou ameaçou usar arma de fogo contra você?",
    opcoes: ["Não", "Sim, ameaçou", "Sim, usou", "Não sei"],
    riscos: [0, 1, 1, 0]
  },
  {
    id: 3,
    pergunta: "Seu parceiro/ex-parceiro demonstra ciúme excessivo ou possessividade?",
    opcoes: ["Não", "Às vezes", "Frequentemente", "Sempre", "Não sei"],
    riscos: [0, 0, 1, 1, 0]
  },
  {
    id: 4,
    pergunta: "Seu parceiro/ex-parceiro controla suas atividades diárias (onde vai, com quem fala)?",
    opcoes: ["Não", "Às vezes", "Frequentemente", "Sempre", "Não sei"],
    riscos: [0, 0, 1, 1, 0]
  },
  {
    id: 5,
    pergunta: "A violência tem aumentado em frequência ou gravidade recentemente?",
    opcoes: ["Não", "Mantém-se igual", "Sim, aumentou", "Não sei"],
    riscos: [0, 0, 1, 0]
  },
  {
    id: 6,
    pergunta: "Você tem medo que seu parceiro/ex-parceiro possa machucar você gravemente?",
    opcoes: ["Não", "Às vezes", "Sim, tenho medo", "Não sei"],
    riscos: [0, 0, 1, 0]
  }
];

export const ChatIA: React.FC<ChatIAProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Oi! 💜 Eu sou a Ana, sua assistente do Acolher.

Estou aqui para conversar com você e te ajudar de forma segura e sigilosa. Pode ficar tranquila, tudo que conversarmos aqui fica só entre nós.

Posso te ajudar com:
• Uma avaliação rápida da sua situação
• Informações sobre seus direitos
• Contatos de pessoas e lugares que podem te apoiar
• Orientações de segurança

Como você está se sentindo hoje? Em que posso te ajudar?`,
      isBot: true,
      timestamp: new Date()
    }
  ]);
  
  const [inputText, setInputText] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [respostas, setRespostas] = useState<number[]>([]);
  const [avaliacaoIniciada, setAvaliacaoIniciada] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (text: string, isBot: boolean = false) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateTyping = async (duration: number = 1500) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, duration));
    setIsTyping(false);
  };



  const finalizarAvaliacao = (respostasFinais: number[]) => {
    const pontuacaoTotal = respostasFinais.reduce((total, resposta) => total + resposta, 0);
    const maxPontuacao = avaliacaoPerguntas.length;
    
    let nivel = '';
    let cor = '';
    let recomendacoes: string[] = [];
    
    if (pontuacaoTotal === 0) {
      nivel = 'Baixo Risco';
      cor = '🟢';
      recomendacoes = [
        'Continue cuidando da sua segurança',
        'Mantenha contatos de emergência sempre à mão',
        'Confie nos seus instintos',
        'Procure apoio de amigos e família quando precisar'
      ];
    } else if (pontuacaoTotal <= 2) {
      nivel = 'Risco Moderado';
      cor = '🟡';
      recomendacoes = [
        'Converse com pessoas de confiança sobre sua situação',
        'Considere buscar orientação profissional',
        'Tenha um plano de segurança preparado',
        'Mantenha documentos importantes em local seguro'
      ];
    } else if (pontuacaoTotal <= 4) {
      nivel = 'Risco Alto';
      cor = '🟠';
      recomendacoes = [
        'IMPORTANTE: Procure ajuda profissional especializada',
        'Entre em contato com a Central 180',
        'Considere medidas protetivas',
        'Tenha sempre um plano de fuga preparado',
        'Conte com sua rede de apoio'
      ];
    } else {
      nivel = 'Risco Crítico';
      cor = '🔴';
      recomendacoes = [
        'URGENTE: Procure ajuda imediatamente',
        'Ligue 190 em caso de perigo iminente',
        'Busque abrigo em local seguro',
        'Entre em contato com serviços especializados',
        'Considere medidas protetivas de urgência'
      ];
    }

    const resultado = `📊 RESULTADO DA AVALIAÇÃO

${cor} Situação: ${nivel}

Pontuação: ${pontuacaoTotal}/${maxPontuacao}

💜 Recomendações:
${recomendacoes.map(rec => `• ${rec}`).join('\n')}

📞 Contatos importantes:
• 180 - Central de Atendimento à Mulher
• 190 - Polícia Militar
• 192 - SAMU

Gostaria de conhecer a rede de apoio próxima a você?`;

    addMessage(resultado, true);
    
    // Resetar avaliação
    setAvaliacaoIniciada(false);
    setCurrentQuestion(-1);
    setRespostas([]);
  };



  const handleSendMessage = async () => {
    if (!inputText.trim() || isTyping) return;

    const userMessage = inputText.trim();
    addMessage(userMessage, false);
    setInputText('');

    await simulateTyping();

    const messageLower = userMessage.toLowerCase();
    
    // Lógica de avaliação em andamento
    if (avaliacaoIniciada && currentQuestion < avaliacaoPerguntas.length) {
      // Reconhecer números, palavras-chave e respostas variadas
      let respostaIndex = -1;
      
      // Tentar reconhecer números primeiro
      const numeroMatch = userMessage.match(/\b([1-5])\b/);
      if (numeroMatch) {
        respostaIndex = parseInt(numeroMatch[1]) - 1;
      } else {
        // Reconhecer palavras-chave para cada opção
        const opcao = avaliacaoPerguntas[currentQuestion];
        if (messageLower.includes('não') || messageLower.includes('nao') || messageLower.includes('nunca') || messageLower.includes('jamais')) {
          respostaIndex = 0; // Não
        } else if (messageLower.includes('uma vez') || messageLower.includes('poucas') || messageLower.includes('raramente') || messageLower.includes('às vezes') || messageLower.includes('as vezes')) {
          respostaIndex = 1; // Sim, uma vez
        } else if (messageLower.includes('algumas') || messageLower.includes('várias') || messageLower.includes('varias') || messageLower.includes('frequente')) {
          respostaIndex = 2; // Sim, algumas vezes
        } else if (messageLower.includes('muitas') || messageLower.includes('sempre') || messageLower.includes('constantemente') || messageLower.includes('direto')) {
          respostaIndex = 3; // Sim, muitas vezes
        } else if (messageLower.includes('não sei') || messageLower.includes('nao sei') || messageLower.includes('talvez') || messageLower.includes('incerta')) {
          respostaIndex = 4; // Não sei
        }
      }

      if (respostaIndex >= 0 && respostaIndex < avaliacaoPerguntas[currentQuestion].opcoes.length) {
        const novasRespostas = [...respostas, respostaIndex];
        setRespostas(novasRespostas);

        if (currentQuestion < avaliacaoPerguntas.length - 1) {
          // Próxima pergunta com feedback positivo
          const proximaPergunta = currentQuestion + 1;
          setCurrentQuestion(proximaPergunta);
          const feedbacks = [
            "Entendi! 💜 Vamos para a próxima:",
            "Obrigada por compartilhar. 💜 Próxima pergunta:",
            "Anotado! 💜 Continuando:",
            "Compreendo. 💜 Vamos seguir:",
            "Muito bem! 💜 Próxima questão:"
          ];
          const feedback = feedbacks[Math.floor(Math.random() * feedbacks.length)];
          addMessage(`${feedback}

${avaliacaoPerguntas[proximaPergunta].pergunta}

Você pode escolher:
${avaliacaoPerguntas[proximaPergunta].opcoes.map((opcao, i) => `${i + 1}. ${opcao}`).join('\n')}`, true);
        } else {
          // Finalizar avaliação
          finalizarAvaliacao(novasRespostas);
        }
      } else {
        await simulateTyping();
        addMessage(`Entendo que pode ser difícil responder. 😊 Você pode:

• Escolher um número (1, 2, 3, 4 ou 5)
• Ou me dizer com suas palavras (ex: "não", "às vezes", "sempre")

Estou aqui para te ajudar, sem pressa! 💜`, true);
      }
      return;
    }

    // Reconhecimento de intenções melhorado
    if (messageLower.includes('avaliação') || messageLower.includes('avaliar') || messageLower.includes('risco') || 
        messageLower.includes('situação') || messageLower.includes('pergunta') || messageLower.includes('teste') ||
        messageLower.includes('questionário') || messageLower.includes('questionario')) {
      setAvaliacaoIniciada(true);
      setCurrentQuestion(0);
      setRespostas([]);
      addMessage(`Claro! Vou te ajudar a entender melhor sua situação. 💜

Vou fazer 6 perguntinhas rápidas. Tudo que conversarmos fica só entre nós, pode ficar tranquila.

Vamos começar?

${avaliacaoPerguntas[0].pergunta}

Você pode escolher:
${avaliacaoPerguntas[0].opcoes.map((opcao, i) => `${i + 1}. ${opcao}`).join('\n')}`, true);
    } else if (messageLower.includes('contato') || messageLower.includes('ajuda') || messageLower.includes('apoio') || 
               messageLower.includes('telefone') || messageLower.includes('emergência') || messageLower.includes('emergencia') ||
               messageLower.includes('socorro') || messageLower.includes('polícia') || messageLower.includes('policia')) {
      addMessage(`Aqui estão contatos importantes que podem te ajudar: 💜

🚨 Emergências:
• 190 - Polícia Militar
• 180 - Central de Atendimento à Mulher
• 181 - Disque Denúncia

🏥 Apoio Especializado:
• CREAS - Centro de Referência Especializado
• Defensoria Pública da Mulher
• Casa da Mulher Brasileira

💜 Lembre-se: Você não está sozinha. Esses serviços existem para te proteger e apoiar.`, true);
    } else if (messageLower.includes('direito') || messageLower.includes('lei') || messageLower.includes('legal') ||
               messageLower.includes('maria da penha') || messageLower.includes('medida protetiva') || messageLower.includes('denúncia') || messageLower.includes('denuncia')) {
      addMessage(`Você tem direitos importantes garantidos por lei! 💜

⚖️ Lei Maria da Penha te protege:
• Medidas protetivas de urgência
• Afastamento do agressor
• Proibição de aproximação
• Acompanhamento psicológico gratuito

📋 Seus direitos incluem:
• Atendimento humanizado na delegacia
• Assistência jurídica gratuita
• Proteção da sua privacidade
• Apoio para você e seus filhos

💪 Lembre-se: Conhecer seus direitos é o primeiro passo para se proteger!`, true);
    } else if (messageLower.includes('medo') || messageLower.includes('assustada') || messageLower.includes('com medo') ||
               messageLower.includes('preocupada') || messageLower.includes('nervosa') || messageLower.includes('ansiosa')) {
      addMessage(`Eu entendo que você está com medo, e isso é completamente normal. 💜

Sentir medo em situações de perigo é um sinal de que você precisa se proteger. Você foi muito corajosa em buscar ajuda.

🌟 Algumas coisas que podem te ajudar:
• Confie nos seus instintos
• Tenha sempre um plano de segurança
• Mantenha contatos de emergência salvos
• Converse com pessoas de confiança

Quer que eu te ajude com alguma coisa específica? Posso fazer uma avaliação da sua situação ou te passar mais contatos de apoio.`, true);
    } else if (messageLower.includes('triste') || messageLower.includes('deprimida') || messageLower.includes('sozinha') ||
               messageLower.includes('sem esperança') || messageLower.includes('sem saída') || messageLower.includes('cansada')) {
      addMessage(`Sinto muito que você esteja passando por isso. 💜 Suas emoções são válidas e você não está sozinha.

🤗 Quero que você saiba:
• Você é forte e corajosa
• Merece ser tratada com respeito e amor
• Existem pessoas que querem te ajudar
• Sempre há uma saída, mesmo quando parece impossível

✨ Você já deu o primeiro passo ao buscar informações e apoio. Isso mostra sua força interior.

Posso te ajudar com uma avaliação da situação ou te conectar com apoio profissional. O que você gostaria?`, true);
    } else if (messageLower.includes('obrigad') || messageLower.includes('valeu') || messageLower.includes('muito bom') ||
               messageLower.includes('ajudou') || messageLower.includes('útil') || messageLower.includes('util')) {
      addMessage(`Fico muito feliz em poder te ajudar! 💜

Lembre-se: você é forte, corajosa e merece todo o apoio do mundo. Estou sempre aqui quando precisar.

🌟 Se quiser, posso:
• Fazer uma avaliação mais detalhada
• Te passar mais contatos de apoio
• Explicar melhor seus direitos

Cuide-se muito! Um abraço! 🤗`, true);
    } else if (messageLower.includes('oi') || messageLower.includes('olá') || messageLower.includes('ola') ||
               messageLower.includes('bom dia') || messageLower.includes('boa tarde') || messageLower.includes('boa noite')) {
      addMessage(`Oi! 💜 Que bom te ver aqui! Como você está se sentindo hoje?

Estou aqui para te ajudar com qualquer coisa que precisar. Posso:

• "avaliação" - fazer uma conversa para entender sua situação
• "contatos" - te passar números e lugares de apoio
• "direitos" - explicar o que a lei garante para você

Ou você pode me contar como está se sentindo. Estou aqui para te ouvir! 😊`, true);
    } else {
      // Resposta mais inteligente e contextual
      const respostasInteligentes = [
        'Entendo o que você está dizendo. 💜 Como posso te ajudar melhor? Posso fazer uma avaliação da sua situação, te passar contatos de apoio ou explicar seus direitos.',
        'Obrigada por compartilhar isso comigo. 💜 Estou aqui para te apoiar. Que tipo de ajuda você está precisando hoje?',
        'Eu te escuto e me importo com o que você está passando. 💜 Posso te ajudar de várias formas - me diga o que você gostaria de saber.',
        'Suas palavras são importantes para mim. 💜 Como posso te apoiar melhor? Posso fazer perguntas para entender sua situação ou te conectar com recursos de ajuda.',
        'Estou aqui para te ouvir e ajudar. 💜 Se quiser, posso te guiar através de uma conversa sobre sua situação ou te dar informações sobre apoio disponível.'
      ];
      const resposta = respostasInteligentes[Math.floor(Math.random() * respostasInteligentes.length)];
      addMessage(resposta, true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Header do Chat */}
      <div className="bg-red-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <HeartHandshake className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold">Assistente Acolher</h3>
            <p className="text-xs opacity-90">IA especializada em segurança</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-white hover:bg-white hover:bg-opacity-20"
        >
          ✕
        </Button>
      </div>

      {/* Área de Mensagens */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">{/* Scroll automático para última mensagem */}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                message.isBot
                  ? 'bg-gray-50 text-gray-800 border border-gray-200'
                  : 'bg-red-600 text-white'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.isBot && (
                  <Heart className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                )}
                <div className="whitespace-pre-wrap text-sm">
                  {message.text}
                </div>
                {!message.isBot && (
                  <User className="h-4 w-4 text-white opacity-70 mt-0.5 flex-shrink-0" />
                )}
              </div>
              <div className={`text-xs mt-2 ${message.isBot ? 'text-gray-500' : 'text-white opacity-70'}`}>
                {message.timestamp.toLocaleTimeString('pt-BR', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-50 text-gray-800 p-3 rounded-2xl border border-gray-200">
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4 text-red-600 animate-pulse" />
                <div className="text-sm">
                  <span className="inline-flex space-x-1">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>.</span>
                    <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Área de Input */}
      <div className="p-4 bg-white border-t border-gray-200">
        {/* Botão SOS integrado */}
        <Button
          onClick={() => window.location.href = '/emergencia'}
          className="w-full bg-red-600 hover:bg-red-700 text-white mb-3 py-3 animate-pulse"
        >
          🚨 EMERGÊNCIA - SOS
        </Button>

        <div className="flex space-x-2">
          <Input
            ref={inputRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Digite sua mensagem..."
            disabled={isTyping}
            className="flex-1 border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className="bg-red-600 hover:bg-red-700 text-white px-4"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}; 