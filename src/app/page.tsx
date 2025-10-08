"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Brain, CheckCircle, CreditCard, Star } from 'lucide-react'

// Banco de perguntas do teste de QI
const questions = [
  {
    id: 1,
    question: "Qual número vem a seguir na sequência: 2, 4, 8, 16, ?",
    options: ["24", "32", "30", "28"],
    correct: 1
  },
  {
    id: 2,
    question: "Se CASA é para MORAR, então CARRO é para:",
    options: ["Dirigir", "Viajar", "Transportar"],
    correct: 2
  },
  {
    id: 3,
    question: "Qual figura completa a sequência: ○ △ ○ △ ?",
    options: ["○", "△", "□"],
    correct: 0
  },
  {
    id: 4,
    question: "João tem 3 irmãos. Cada irmão tem 2 irmãs. Quantos filhos há na família?",
    options: ["5", "6", "7", "8"],
    correct: 1
  },
  {
    id: 5,
    question: "Qual palavra não pertence ao grupo?",
    options: ["Maçã", "Banana", "Cenoura", "Laranja"],
    correct: 2
  },
  {
    id: 6,
    question: "Se 5 + 3 = 28, e 9 + 1 = 810, então 8 + 6 = ?",
    options: ["214", "314", "414", "514"],
    correct: 1
  },
  {
    id: 7,
    question: "Qual número está faltando: 1, 4, 9, 16, ?, 36",
    options: ["20", "25", "30", "32"],
    correct: 1
  },
  {
    id: 8,
    question: "LIVRO está para PÁGINA como CASA está para:",
    options: ["Porta", "Quarto", "Telhado", "Janela"],
    correct: 1
  },
  {
    id: 9,
    question: "Se todos os gatos são animais e alguns animais são selvagens, então:",
    options: ["Todos os gatos são selvagens", "Alguns gatos podem ser selvagens", "Nenhum gato é selvagem"],
    correct: 1
  },
  {
    id: 10,
    question: "Qual é o próximo número: 3, 6, 12, 24, ?",
    options: ["36", "48", "42", "50"],
    correct: 1
  },
  {
    id: 11,
    question: "Se você reorganizar as letras 'ONVAI', você obtém o nome de um(a):",
    options: ["Animal", "Cidade", "Instrumento", "Avião"],
    correct: 3
  },
  {
    id: 12,
    question: "Qual forma geométrica tem exatamente 5 lados?",
    options: ["Hexágono", "Pentágono", "Octógono", "Heptágono"],
    correct: 1
  },
  {
    id: 13,
    question: "Se 2 + 2 = 4, e 3 + 3 = 6, então 4 + 4 = ?",
    options: ["6", "7", "8", "9"],
    correct: 2
  },
  {
    id: 14,
    question: "Qual palavra é o oposto de 'EXPANDIR'?",
    options: ["Crescer", "Contrair", "Aumentar", "Esticar"],
    correct: 1
  },
  {
    id: 15,
    question: "Em uma corrida, você ultrapassou a pessoa em 2º lugar. Em que posição você está?",
    options: ["1º lugar", "2º lugar", "3º lugar", "Último lugar"],
    correct: 1
  },
  {
    id: 16,
    question: "Qual número completa a sequência: 100, 81, 64, 49, ?",
    options: ["36", "25", "16", "9"],
    correct: 0
  },
  {
    id: 17,
    question: "Se VERDE é para FOLHA, então AZUL é para:",
    options: ["Céu", "Água", "Mar", "Todas as anteriores"],
    correct: 3
  },
  {
    id: 18,
    question: "Quantos triângulos você pode ver nesta figura: △▲△?",
    options: ["2", "3", "4", "5"],
    correct: 1
  },
  {
    id: 19,
    question: "Se um trem elétrico está indo para o norte, para onde vai a fumaça?",
    options: ["Norte", "Sul", "Leste", "Não há fumaça"],
    correct: 3
  },
  {
    id: 20,
    question: "Qual é o próximo na sequência: A, C, F, J, ?",
    options: ["M", "N", "O", "P"],
    correct: 2
  },
  {
    id: 21,
    question: "Se você tem 6 maçãs e tira 4, quantas você tem?",
    options: ["2", "4", "6", "10"],
    correct: 1
  },
  {
    id: 22,
    question: "Qual número não pertence: 2, 3, 6, 7, 8, 14, 15, 30?",
    options: ["8", "6", "14", "30"],
    correct: 0
  },
  {
    id: 23,
    question: "Se SEGUNDA é 1, TERÇA é 2, então DOMINGO é:",
    options: ["6", "7", "0", "8"],
    correct: 2
  },
  {
    id: 24,
    question: "Qual palavra pode ser formada com as letras: R-A-M-O-A?",
    options: ["AMOR", "ROMA", "MORA", "Todas as anteriores"],
    correct: 3
  },
  {
    id: 25,
    question: "Se 1 = 5, 2 = 25, 3 = 125, então 4 = ?",
    options: ["625", "500", "250", "1000"],
    correct: 0
  }
]

const motivationalMessages = [
  "Excelente! Continue assim! 🧠",
  "Você está indo muito bem! ⭐",
  "Impressionante! Seu raciocínio está afiado! 🎯",
  "Fantástico! Continue focado! 💪",
  "Ótimo trabalho! Você é brilhante! ✨",
  "Perfeito! Sua mente está em forma! 🚀",
  "Incrível! Continue nesse ritmo! 🔥",
  "Maravilhoso! Você está arrasando! 🌟"
]

export default function IQTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [testStarted, setTestStarted] = useState(false)
  const [showMotivation, setShowMotivation] = useState(false)
  const [currentMotivation, setCurrentMotivation] = useState("")

  const progress = ((currentQuestion + 1) / questions.length) * 100

  const calculateIQ = () => {
    let correctAnswers = 0
    answers.forEach((answer, index) => {
      if (answer === questions[index].correct) {
        correctAnswers++
      }
    })
    
    // Fórmula simplificada para calcular QI baseado na porcentagem de acertos
    const percentage = (correctAnswers / questions.length) * 100
    let iq = 85 + (percentage * 0.3) // IQ base 85, máximo ~115
    
    if (percentage >= 90) iq = 130 + Math.random() * 15 // Superdotado
    else if (percentage >= 80) iq = 115 + Math.random() * 15 // Acima da média
    else if (percentage >= 60) iq = 100 + Math.random() * 15 // Média
    else if (percentage >= 40) iq = 90 + Math.random() * 10 // Abaixo da média
    
    return Math.round(iq)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return

    const newAnswers = [...answers, selectedAnswer]
    setAnswers(newAnswers)

    // Mostrar mensagem motivacional
    const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]
    setCurrentMotivation(randomMessage)
    setShowMotivation(true)

    setTimeout(() => {
      setShowMotivation(false)
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        setShowResult(true)
      }
    }, 1500)
  }

  const handleStartTest = () => {
    setTestStarted(true)
  }

  const handlePayment = () => {
    // Simular redirecionamento para MercadoPago
    const mercadoPagoLink = "https://mpago.la/2K8vN9X" // Link de exemplo
    window.open(mercadoPagoLink, '_blank')
    setShowPayment(true)
  }

  if (!testStarted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <Brain className="h-16 w-16 text-[#4A90E2]" />
            </div>
            <CardTitle className="text-3xl font-bold text-[#333333]">
              Teste de QI Profissional
            </CardTitle>
            <p className="text-lg text-[#333333] opacity-80">
              Descubra seu verdadeiro potencial intelectual com nosso teste científico
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-[#B3D4FC] bg-opacity-20 rounded-lg">
                <div className="text-2xl font-bold text-[#4A90E2]">25</div>
                <div className="text-sm text-[#333333]">Perguntas</div>
              </div>
              <div className="p-4 bg-[#B3D4FC] bg-opacity-20 rounded-lg">
                <div className="text-2xl font-bold text-[#4A90E2]">10-15</div>
                <div className="text-sm text-[#333333]">Minutos</div>
              </div>
              <div className="p-4 bg-[#B3D4FC] bg-opacity-20 rounded-lg">
                <div className="text-2xl font-bold text-[#4A90E2]">Científico</div>
                <div className="text-sm text-[#333333]">Método</div>
              </div>
            </div>
            
            <div className="space-y-3 text-[#333333]">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-[#4CAF50]" />
                <span>Teste baseado em padrões científicos reconhecidos</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-[#4CAF50]" />
                <span>Resultado instantâneo e detalhado</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-[#4CAF50]" />
                <span>Comparação com população mundial</span>
              </div>
            </div>

            <Button 
              onClick={handleStartTest}
              className="w-full bg-[#4A90E2] hover:bg-[#4A90E2]/90 text-white py-6 text-lg font-semibold"
            >
              Iniciar Teste de QI
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showMotivation) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="py-12">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-[#4CAF50] mb-2">
              {currentMotivation}
            </h2>
            <p className="text-[#333333] opacity-70">
              Preparando próxima pergunta...
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showResult) {
    const iq = calculateIQ()
    const correctAnswers = answers.filter((answer, index) => answer === questions[index].correct).length
    
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <Star className="h-16 w-16 text-[#FFB300]" />
            </div>
            <CardTitle className="text-3xl font-bold text-[#333333]">
              Parabéns! Teste Concluído
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center p-6 bg-gradient-to-r from-[#4A90E2] to-[#B3D4FC] rounded-lg text-white">
              <div className="text-sm opacity-90 mb-2">Seu QI Estimado</div>
              <div className="text-6xl font-bold mb-2">
                {showPayment ? iq : "???"}
              </div>
              <div className="text-sm opacity-90">
                {showPayment ? `${correctAnswers} de ${questions.length} respostas corretas` : "Desbloqueie seu resultado completo"}
              </div>
            </div>

            {!showPayment ? (
              <div className="space-y-4">
                <div className="p-4 bg-[#FFB300] bg-opacity-10 border border-[#FFB300] rounded-lg">
                  <div className="flex items-center gap-3 text-[#FFB300]">
                    <CreditCard className="h-5 w-5" />
                    <span className="font-semibold">Resultado Completo Disponível</span>
                  </div>
                  <p className="text-[#333333] mt-2 text-sm">
                    Desbloqueie sua pontuação detalhada, comparação com a população mundial e análise completa por apenas R$ 0,99
                  </p>
                </div>

                <Button 
                  onClick={handlePayment}
                  className="w-full bg-[#4A90E2] hover:bg-[#4A90E2]/90 text-white py-6 text-lg font-semibold"
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  Desbloquear Resultado - R$ 0,99
                </Button>

                <p className="text-center text-sm text-[#333333] opacity-60">
                  Pagamento seguro via MercadoPago
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-[#4CAF50] bg-opacity-10 border border-[#4CAF50] rounded-lg text-center">
                    <div className="text-2xl font-bold text-[#4CAF50]">{Math.round((correctAnswers/questions.length)*100)}%</div>
                    <div className="text-sm text-[#333333]">Taxa de Acerto</div>
                  </div>
                  <div className="p-4 bg-[#4A90E2] bg-opacity-10 border border-[#4A90E2] rounded-lg text-center">
                    <div className="text-2xl font-bold text-[#4A90E2]">
                      {iq >= 130 ? "Superior" : iq >= 115 ? "Acima da Média" : iq >= 85 ? "Média" : "Abaixo da Média"}
                    </div>
                    <div className="text-sm text-[#333333]">Classificação</div>
                  </div>
                </div>

                <div className="p-4 bg-[#4CAF50] bg-opacity-10 border border-[#4CAF50] rounded-lg">
                  <h3 className="font-semibold text-[#4CAF50] mb-2">✅ Análise Completa Desbloqueada</h3>
                  <p className="text-[#333333] text-sm">
                    Seu QI de {iq} pontos coloca você entre os {iq >= 130 ? "2%" : iq >= 115 ? "16%" : iq >= 85 ? "68%" : "16%"} da população mundial. 
                    Parabéns pelo seu desempenho no teste!
                  </p>
                </div>

                <Button 
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="w-full border-[#4A90E2] text-[#4A90E2] hover:bg-[#4A90E2] hover:text-white"
                >
                  Fazer Novo Teste
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header com progresso */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline" className="text-[#4A90E2] border-[#4A90E2]">
              Pergunta {currentQuestion + 1} de {questions.length}
            </Badge>
            <div className="text-sm text-[#333333] opacity-70">
              {Math.round(progress)}% concluído
            </div>
          </div>
          <Progress 
            value={progress} 
            className="h-3 bg-gray-200"
            style={{
              background: `linear-gradient(to right, #4A90E2 0%, #B3D4FC 100%)`
            }}
          />
        </div>

        {/* Pergunta */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl text-[#333333] leading-relaxed">
              {question.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswer === index
                    ? 'border-[#4A90E2] bg-[#B3D4FC] bg-opacity-20 text-[#4A90E2] font-semibold'
                    : 'border-gray-200 hover:border-[#B3D4FC] hover:bg-gray-50 text-[#333333]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswer === index 
                      ? 'border-[#4A90E2] bg-[#4A90E2]' 
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswer === index && (
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className="text-base md:text-lg">{option}</span>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Botão próxima pergunta */}
        <div className="flex justify-center">
          <Button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            className="px-8 py-3 bg-[#4A90E2] hover:bg-[#4A90E2]/90 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestion === questions.length - 1 ? 'Finalizar Teste' : 'Próxima Pergunta'}
          </Button>
        </div>
      </div>
    </div>
  )
}