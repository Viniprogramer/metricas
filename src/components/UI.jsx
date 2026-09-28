import { Check, LoaderCircle, AlertCircle } from 'lucide-react'

export function Loading({text='Loading data...'}) {
  return <div className="state-box"><LoaderCircle className="spin" size={19}/><span>{text}</span></div>
}

export function ErrorState({message,onRetry,retryLabel='Try again'}) {
  return <div className="state-box error-state"><AlertCircle size={19}/><span>{message}</span>{onRetry && <button className="outline" onClick={onRetry}>{retryLabel}</button>}</div>
}

export function Toast({message,onClose}) {
  if (!message) return null
  return <div className="toast"><Check size={15}/>{message}<button onClick={onClose}>×</button></div>
}

export function Modal({title,children,onClose}) {
  return <div className="modal-backdrop" onMouseDown={onClose}><div className="modal" onMouseDown={e=>e.stopPropagation()}><div className="modal-head"><h2>{title}</h2><button onClick={onClose}>×</button></div>{children}</div></div>
}
