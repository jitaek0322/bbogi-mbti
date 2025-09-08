import React, { useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useLocation } from 'react-router-dom'

export default function EventPage() {
  const loc = useLocation() as any
  const mbti = loc?.state?.mbti || 'UNKNOWN'

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [agree, setAgree] = useState(false)
  const [marketingAgree, setMarketingAgree] = useState(false)
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  // 모달 상태
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [showMarketing, setShowMarketing] = useState(false)

  const validatePhone = (input: string) => {
    const onlyNums = input.replace(/\D/g, '')
    if (onlyNums.length <= 10) {
      return onlyNums.replace(/(\d{3})(\d{3,4})(\d{0,4})/, '$1-$2-$3').replace(/-$/, '')
    }
    return onlyNums.replace(/(\d{3})(\d{4})(\d{0,4})/, '$1-$2-$3').replace(/-$/, '')
  }

  const submit = async () => {
    setMsg('')

    if (mbti === 'UNKNOWN') {
      setMsg('⚠️ 검사 결과가 확인되지 않았습니다.')
      return
    }
    if (!name.trim()) {
      setMsg('이름을 입력해주세요.')
      return
    }
    if (!phone || !/^01[016789]-\d{3,4}-\d{4}$/.test(phone)) {
      setMsg('올바른 휴대폰 번호를 입력해주세요.')
      return
    }
    if (!agree) {
      setMsg('개인정보 수집·이용에 동의해야 합니다.')
      return
    }

    setLoading(true)

    try {
      // Firestore에 저장 (중복 체크는 서버에서 하는 게 안전함)
      await addDoc(collection(db, 'submissions'), {
        name: name.trim(),
        phone,
        agree,
        marketingAgree,
        mbti,
        createdAt: serverTimestamp(),
      })

      setMsg('✅ 참여가 완료되었습니다! 감사합니다.')
      setName('')
      setPhone('')
      setAgree(false)
      setMarketingAgree(false)
    } catch (e) {
      console.error('Firestore 저장 오류:', e)
      setMsg('❌ 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <div className="card space-y-3">
        <h2 className="text-xl font-extrabold">이벤트 참여</h2>
        <p className="text-sm text-neutral-600">
          결과 페이지에서 넘어오셨다면 자동으로 MBTI가 기록됩니다. (현재: <b>{mbti}</b>)
        </p>

        <label className="block">
          <div className="text-sm mb-1">이름</div>
          <input
            className="w-full border rounded-xl px-3 py-3"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="홍길동"
          />
        </label>

        <label className="block">
          <div className="text-sm mb-1">연락처</div>
          <input
            className="w-full border rounded-xl px-3 py-3"
            value={phone}
            onChange={e => setPhone(validatePhone(e.target.value))}
            placeholder="010-0000-0000"
            maxLength={13}
          />
        </label>

        <label className="flex gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={agree}
            onChange={e => setAgree(e.target.checked)}
          />
          <span className="text-sm underline" onClick={() => setShowPrivacy(true)}>
            개인정보 수집·이용에 동의합니다. (필수)
          </span>
        </label>

        <label className="flex gap-2 items-center cursor-pointer">
          <input
            type="checkbox"
            checked={marketingAgree}
            onChange={e => setMarketingAgree(e.target.checked)}
          />
          <span className="text-sm underline" onClick={() => setShowMarketing(true)}>
            마케팅 정보 수신에 동의합니다. (선택)
          </span>
        </label>

        <button
          className="btn btn-primary w-full disabled:opacity-50"
          onClick={submit}
          disabled={loading || mbti === 'UNKNOWN'}
        >
          {loading ? '처리 중...' : '참여하기'}
        </button>

        {msg && (
          <div
            className={`text-center text-sm mt-2 ${
              msg.startsWith('✅') ? 'text-green-600' :
              msg.startsWith('❌') ? 'text-red-600' :
              'text-bboggi-red'
            }`}
          >
            {msg}
          </div>
        )}
      </div>

      <p className="mt-3 text-center text-xs text-neutral-500">
        ※ 동일 전화번호 중복 방지는 서버 검증이 필요합니다.
      </p>

      {/* 개인정보 모달 */}
      {showPrivacy && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-lg overflow-y-auto max-h-[80vh]">
            <h3 className="font-bold text-lg mb-4">개인정보 수집·이용 안내</h3>
            <div className="text-sm text-neutral-700 space-y-4">
              <div>
                <b>1. 수집 항목</b>
                <ul className="list-disc pl-5">
                  <li>필수: 이름, 연락처(휴대전화), MBTI 결과</li>
                  <li>선택: 마케팅 수신 여부</li>
                </ul>
              </div>
              <div>
                <b>2. 수집 목적</b>
                <ul className="list-disc pl-5">
                  <li>이벤트 응모 확인 및 경품 추첨, 당첨 안내</li>
                  <li>행사 진행 및 운영 관리</li>
                  <li>(선택 동의 시) 향후 행사·프로그램 홍보 및 정보 제공</li>
                </ul>
              </div>
              <div>
                <b>3. 보유 및 이용 기간</b>
                <p>- 이벤트 종료 후 3개월 이내 파기<br/>- 단, 관계 법령에 따른 보존 의무가 있는 경우 해당 기간 동안 보관</p>
              </div>
              <div>
                <b>4. 제3자 제공</b>
                <p>- 경품 발송을 위해 배송 업체에 이름·연락처를 제공할 수 있으며, 제공 목적 달성 후 즉시 파기합니다.</p>
              </div>
              <div>
                <b>5. 개인정보 보호책임자</b>
                <p>- 성명: (주) 애이앤비프로젝트 / 경영지원팀 하지택 주임<br/>- 연락처: 053-253-0515 / tag@anbprojec.kr</p>
              </div>
            </div>
            <button className="btn btn-primary mt-6 w-full" onClick={() => setShowPrivacy(false)}>닫기</button>
          </div>
        </div>
      )}

      {/* 마케팅 모달 */}
      {showMarketing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-lg overflow-y-auto max-h-[80vh]">
            <h3 className="font-bold text-lg mb-4">마케팅 정보 수신 동의 안내</h3>
            <div className="text-sm text-neutral-700 space-y-4">
              <div>
                <b>1. 이용 항목</b>
                <ul className="list-disc pl-5">
                  <li>이름</li>
                  <li>연락처(휴대전화)</li>
                </ul>
              </div>
              <div>
                <b>2. 이용 목적</b>
                <ul className="list-disc pl-5">
                  <li>축제 및 이벤트 홍보</li>
                  <li>할인·혜택 정보 제공</li>
                  <li>뉴스레터, 문자, 카카오톡 채널 발송</li>
                </ul>
              </div>
              <div>
                <b>3. 보유 및 이용 기간</b>
                <p>- 동의 철회 시까지 보관 및 이용<br/>- 철회 요청 시 즉시 파기</p>
              </div>
              <div>
                <b>비고</b>
                <p>※ 본 동의는 선택사항이며, 동의하지 않아도 이벤트 참여 및 당첨에는 제한이 없습니다.<br/>※ 마케팅 수신 동의 철회는 개인정보 보호책임자(contact@anbproject.kr / 053-253-0515)에게 요청할 수 있습니다.</p>
              </div>
            </div>
            <button className="btn btn-primary mt-6 w-full" onClick={() => setShowMarketing(false)}>닫기</button>
          </div>
        </div>
      )}
    </section>
  )
}
