import React, { useState } from 'react';
import { Sparkles, Share2, RefreshCw, Gift, ExternalLink } from 'lucide-react';

export default function AuraTestDeploy() {
  const [step, setStep] = useState('intro'); // intro, question, loading, result
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState({ E: 0, I: 0, S: 0, N: 0 }); 
  const [finalResult, setFinalResult] = useState(null);

  // 1. 질문 데이터 (총 5문항 - 실제 서비스 시 12문항 권장)
  const questions = [
    {
      id: 1,
      q: "오랜만에 찾아온 완벽한 휴일, 당신은?",
      a: { text: "친구들에게 연락해 핫플을 찾아 떠난다.", type: "E" },
      b: { text: "밀린 넷플릭스를 보며 침대와 물아일체.", type: "I" }
    },
    {
      id: 2,
      q: "친구가 '나 우울해서 머리 잘랐어'라고 한다면?",
      a: { text: "오! 무슨 스타일? 사진 보여줘 봐!", type: "S" },
      b: { text: "무슨 일 있어? 기분전환은 좀 됐어?", type: "N" }
    },
    {
      id: 3,
      q: "여행 계획을 세울 때 나는?",
      a: { text: "엑셀에 분 단위로 맛집/동선 정리.", type: "S" },
      b: { text: "일단 비행기 표 예매! 가서 생각하자.", type: "N" }
    },
    {
      id: 4,
      q: "파티에서 낯선 사람이 말을 걸어온다.",
      a: { text: "자연스럽게 대화를 이어가며 인스타를 딴다.", type: "E" },
      b: { text: "어색하게 웃으며 도망갈 타이밍을 잰다.", type: "I" }
    },
    {
      id: 5,
      q: "자기 전, 침대에 누웠을 때 나는?",
      a: { text: "내일 아침에 뭐 먹지? (현실적)", type: "S" },
      b: { text: "만약 좀비가 창문으로 들어오면? (상상력)", type: "N" }
    }
  ];

  // 2. 결과 데이터 (쿠팡 파트너스 연동형)
  const results = {
    "ES": {
      title: "🔥 열정의 불꽃 오라",
      desc: "당신은 멈추지 않는 에너자이저! 주변 사람들에게 활력을 불어넣는 리더 타입입니다.",
      color: "bg-gradient-to-br from-orange-400 to-red-600",
      accent: "text-orange-600",
      item: {
        name: "에너지 부스터 영양제",
        desc: "지치지 않는 당신을 위한 필수템",
        link: "https://coupang.com/..." // 실제 본인 링크 삽입
      }
    },
    "EN": {
      title: "☀️ 찬란한 태양 오라",
      desc: "어디서나 주인공! 사람을 좋아하고 분위기를 주도하는 '핵인싸' 재질입니다.",
      color: "bg-gradient-to-br from-yellow-300 to-orange-500",
      accent: "text-yellow-600",
      item: {
        name: "블루투스 마이크 Pro",
        desc: "모임 분위기를 뒤집어놓을 아이템",
        link: "https://coupang.com/..."
      }
    },
    "IS": {
      title: "🌲 차분한 숲 오라",
      desc: "현실적이고 꼼꼼한 당신. 맡은 일은 완벽하게 해내며 혼자만의 시간을 즐깁니다.",
      color: "bg-gradient-to-br from-green-400 to-emerald-700",
      accent: "text-green-700",
      item: {
        name: "고급 가죽 다이어리",
        desc: "당신의 완벽한 계획을 위한 파트너",
        link: "https://coupang.com/..."
      }
    },
    "IN": {
      title: "🌊 깊은 바다 오라",
      desc: "남들은 모르는 깊은 내면의 세계가 있습니다. 창의적이고 예술적인 감각이 뛰어나요.",
      color: "bg-gradient-to-br from-blue-400 to-indigo-700",
      accent: "text-indigo-700",
      item: {
        name: "오로라 무드등",
        desc: "새벽 감성을 채워줄 인테리어 소품",
        link: "https://coupang.com/..."
      }
    }
  };

  // 답변 처리 로직
  const handleAnswer = (type) => {
    setScores(prev => ({ ...prev, [type]: prev[type] + 1 }));
    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1);
    } else {
      setStep('loading');
      setTimeout(() => calculateResult(), 2000); // 2초 로딩 (광고 노출 시간 확보)
    }
  };

  // 결과 산출 로직
  const calculateResult = () => {
    const type1 = scores.E >= scores.I ? "E" : "I";
    const type2 = scores.S >= scores.N ? "S" : "N";
    // 편의상 4개 유형으로만 압축 (실제로는 MBTI 16개 가능)
    setFinalResult(results[type1 + type2] || results["IN"]); 
    setStep('result');
  };

  // 공유하기 기능
  const copyLink = () => {
    // 실제 배포된 URL을 여기에 넣습니다.
    const url = window.location.href; 
    navigator.clipboard.writeText(url);
    alert("링크가 복사되었습니다! 친구들에게 공유해보세요.");
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center py-8 font-sans">
      <div className="w-full max-w-md bg-white min-h-[700px] shadow-2xl rounded-3xl overflow-hidden relative flex flex-col">
        
        {/* --- 1. 인트로 화면 --- */}
        {step === 'intro' && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-purple-500 blur-[50px] opacity-40 animate-pulse"></div>
              <Sparkles className="w-24 h-24 text-purple-600 relative z-10 animate-bounce" />
            </div>
            <h1 className="text-3xl font-black text-gray-900 mb-4 leading-tight">
              나의 숨겨진<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">오라(Aura) 컬러</span> 찾기
            </h1>
            <p className="text-gray-500 mb-10">
              내 분위기는 어떤 색깔일까?<br/>
              3분 만에 알아보는 성향 테스트
            </p>
            <button
              onClick={() => setStep('question')}
              className="w-full py-4 bg-black text-white rounded-2xl font-bold text-xl hover:bg-gray-800 transition-transform active:scale-95 shadow-xl"
            >
              테스트 시작하기
            </button>
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
              <span className="flex -space-x-2">
                {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"></div>)}
              </span>
              <span>15,392명이 참여함</span>
            </div>
          </div>
        )}

        {/* --- 2. 질문 화면 --- */}
        {step === 'question' && (
          <div className="flex-1 flex flex-col p-6 animate-in slide-in-from-right duration-300">
            <div className="w-full bg-gray-100 h-2 rounded-full mb-8">
              <div 
                className="bg-purple-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <span className="text-purple-600 font-bold text-lg mb-2">Q{currentQ + 1}.</span>
              <h2 className="text-2xl font-bold text-gray-900 mb-12 leading-relaxed">
                {questions[currentQ].q}
              </h2>
              <div className="space-y-4">
                <button onClick={() => handleAnswer(questions[currentQ].a.type)} className="w-full p-5 bg-gray-50 border-2 border-gray-100 rounded-2xl text-left text-gray-700 font-medium hover:border-purple-500 hover:bg-purple-50 transition-all active:scale-95">
                  {questions[currentQ].a.text}
                </button>
                <button onClick={() => handleAnswer(questions[currentQ].b.type)} className="w-full p-5 bg-gray-50 border-2 border-gray-100 rounded-2xl text-left text-gray-700 font-medium hover:border-purple-500 hover:bg-purple-50 transition-all active:scale-95">
                  {questions[currentQ].b.text}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- 3. 로딩 화면 (광고 노출 골든타임) --- */}
        {step === 'loading' && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gray-50">
            <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-6"></div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">오라 분석 중...</h3>
            <p className="text-sm text-gray-500 mb-8">당신의 무의식 데이터를 스캔하고 있습니다.</p>
            
            {/* 전면 광고 배너 자리 */}
            <div className="w-full h-48 bg-gray-200 rounded-xl flex items-center justify-center animate-pulse">
              <span className="text-gray-400 font-bold">Google Ads (전면 광고)</span>
            </div>
          </div>
        )}

        {/* --- 4. 결과 화면 --- */}
        {step === 'result' && finalResult && (
          <div className="flex-1 flex flex-col overflow-y-auto animate-in fade-in duration-500 bg-white">
            {/* 결과 카드 */}
            <div className={`relative ${finalResult.color} p-10 pb-16 text-center text-white`}>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
              <p className="text-xs font-bold opacity-80 mb-2 tracking-[0.2em] uppercase">MY AURA TYPE</p>
              <h2 className="text-4xl font-black mb-4 drop-shadow-md">{finalResult.title}</h2>
              <p className="text-white/90 leading-relaxed text-sm font-medium">
                {finalResult.desc}
              </p>
              
              {/* 웨이브 효과 */}
              <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0]">
                <svg className="relative block w-[calc(100%+1.3px)] h-[50px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
                </svg>
              </div>
            </div>

            <div className="px-6 pb-8 -mt-2">
              {/* 수익화 섹션: 행운의 아이템 */}
              <div className="bg-white border-2 border-gray-100 rounded-2xl p-5 shadow-lg mb-6 transform hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <Gift className={`w-5 h-5 ${finalResult.accent}`} />
                  <span className="font-bold text-gray-800">나를 위한 행운템</span>
                </div>
                
                <a 
                  href={finalResult.item.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex gap-4 items-center group cursor-pointer"
                >
                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">
                    
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {finalResult.item.name}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">{finalResult.item.desc}</p>
                    <div className="mt-2 text-xs font-bold text-blue-500 flex items-center gap-1">
                      쿠팡에서 보기 <ExternalLink className="w-3 h-3" />
                    </div>
                  </div>
                </a>
                <p className="text-[10px] text-gray-300 mt-3 text-right">
                  쿠팡 파트너스 활동의 일환으로 수수료를 받습니다.
                </p>
              </div>

              {/* 하단 버튼 */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button 
                  onClick={copyLink}
                  className="py-4 bg-gray-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  <Share2 className="w-4 h-4" /> 링크 공유
                </button>
                <button 
                  onClick={() => {
                    setStep('intro');
                    setCurrentQ(0);
                    setScores({E:0, I:0, S:0, N:0});
                  }}
                  className="py-4 bg-gray-100 text-gray-700 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform hover:bg-gray-200"
                >
                  <RefreshCw className="w-4 h-4" /> 다시 하기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}