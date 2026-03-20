import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play, Square, RotateCcw, CheckCircle, AlertTriangle, Mail,
  Database, Cpu, Radio, Info, XCircle, Zap, Clock
} from 'lucide-react';
import { Button } from './ui/Button';

export interface WorkflowStep {
  text: string;
  detail?: string;
  type: 'scan' | 'receive' | 'process' | 'check' | 'warn' | 'success' | 'email' | 'log' | 'complete' | 'error';
  delay: number;
}

interface WorkflowRunnerProps {
  adeName: string;
  adeColor: string;
  triggerLabel: string;
  triggerDescription: string;
  steps: WorkflowStep[];
  completionSummary: string;
}

type RunState = 'idle' | 'running' | 'stopped' | 'complete';

interface LiveStep extends WorkflowStep {
  id: number;
  timestamp: string;
  visible: boolean;
}

const now = () => {
  const d = new Date();
  return `${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}:${d.getSeconds().toString().padStart(2,'0')}`;
};

const StepIcon = ({ type, isLast }: { type: WorkflowStep['type']; isLast: boolean }) => {
  const base = 'flex-shrink-0 mt-0.5';
  if (type === 'scan')    return <Radio    size={13} className={`${base} text-blue-500`} />;
  if (type === 'receive') return <Mail     size={13} className={`${base} text-indigo-500`} />;
  if (type === 'process') return <Cpu      size={13} className={`${base} text-slate-500`} />;
  if (type === 'check')   return <CheckCircle size={13} className={`${base} text-green-500`} />;
  if (type === 'warn')    return <AlertTriangle size={13} className={`${base} text-amber-500`} />;
  if (type === 'success') return <CheckCircle size={13} className={`${base} text-green-600`} />;
  if (type === 'email')   return <Mail     size={13} className={`${base} text-blue-600`} />;
  if (type === 'log')     return <Database size={13} className={`${base} text-gray-400`} />;
  if (type === 'error')   return <XCircle  size={13} className={`${base} text-red-500`} />;
  if (type === 'complete') return <CheckCircle size={15} className={`${base} text-green-700 font-bold`} />;
  return <Info size={13} className={`${base} text-gray-400`} />;
};

const stepTextColor = (type: WorkflowStep['type']) => {
  if (type === 'warn')    return 'text-amber-800';
  if (type === 'error')   return 'text-red-700';
  if (type === 'success') return 'text-green-800';
  if (type === 'complete') return 'text-green-900 font-semibold';
  if (type === 'email')   return 'text-blue-800';
  if (type === 'check')   return 'text-green-700';
  return 'text-gray-700';
};

const stepRowBg = (type: WorkflowStep['type']) => {
  if (type === 'warn')    return 'bg-amber-50 border-l-2 border-amber-400';
  if (type === 'error')   return 'bg-red-50 border-l-2 border-red-400';
  if (type === 'success') return 'bg-green-50 border-l-2 border-green-400';
  if (type === 'complete') return 'bg-green-50 border-l-2 border-green-600';
  if (type === 'email')   return 'bg-blue-50 border-l-2 border-blue-300';
  return 'border-l-2 border-transparent';
};

export const WorkflowRunner: React.FC<WorkflowRunnerProps> = ({
  adeName, adeColor, triggerLabel, triggerDescription, steps, completionSummary,
}) => {
  const [runState, setRunState] = useState<RunState>('idle');
  const [liveSteps, setLiveSteps] = useState<LiveStep[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const handleRun = useCallback(() => {
    clearAllTimeouts();
    setLiveSteps([]);
    setCurrentIdx(0);
    setProgress(0);
    setRunState('running');

    let cumDelay = 0;
    steps.forEach((step, idx) => {
      cumDelay += step.delay;
      const t = setTimeout(() => {
        setLiveSteps(prev => [
          ...prev,
          { ...step, id: idx, timestamp: now(), visible: true },
        ]);
        setCurrentIdx(idx + 1);
        setProgress(Math.round(((idx + 1) / steps.length) * 100));
        if (idx === steps.length - 1) {
          setRunState('complete');
        }
        // auto-scroll
        setTimeout(() => {
          logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' });
        }, 50);
      }, cumDelay);
      timeoutsRef.current.push(t);
    });
  }, [steps, clearAllTimeouts]);

  const handleStop = useCallback(() => {
    clearAllTimeouts();
    setRunState('stopped');
  }, [clearAllTimeouts]);

  const handleReset = useCallback(() => {
    clearAllTimeouts();
    setLiveSteps([]);
    setCurrentIdx(0);
    setProgress(0);
    setRunState('idle');
  }, [clearAllTimeouts]);

  useEffect(() => () => clearAllTimeouts(), [clearAllTimeouts]);

  const warnCount  = liveSteps.filter(s => s.type === 'warn').length;
  const emailCount = liveSteps.filter(s => s.type === 'email').length;

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
      {/* Header bar */}
      <div className={`px-5 py-3 flex items-center justify-between ${
        runState === 'running' ? 'bg-navy-900' :
        runState === 'complete' ? 'bg-green-800' :
        runState === 'stopped' ? 'bg-amber-700' :
        'bg-gray-100 border-b border-gray-200'
      }`}>
        <div className="flex items-center gap-3">
          {/* Status dot */}
          <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
            runState === 'running' ? 'bg-green-400 pulse-dot' :
            runState === 'complete' ? 'bg-green-300' :
            runState === 'stopped' ? 'bg-amber-300' :
            'bg-gray-400'
          }`} />
          <div>
            <div className={`text-sm font-bold ${runState === 'idle' ? 'text-gray-700' : 'text-white'}`}>
              {runState === 'idle'    ? `${adeName} — Idle` :
               runState === 'running' ? `${adeName} — Executing Workflow` :
               runState === 'stopped' ? `${adeName} — Stopped` :
               `${adeName} — Cycle Complete`}
            </div>
            <div className={`text-[10px] ${runState === 'idle' ? 'text-gray-500' : 'text-white/60'}`}>
              {runState === 'idle'    ? triggerDescription :
               runState === 'running' ? `Step ${currentIdx} of ${steps.length} — ${steps[currentIdx - 1]?.text.slice(0, 55) ?? ''}...` :
               runState === 'stopped' ? `Stopped at step ${currentIdx} of ${steps.length}` :
               completionSummary}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {runState === 'idle' && (
            <Button variant="orange" size="sm" onClick={handleRun}>
              <Play size={13} fill="currentColor" /> {triggerLabel}
            </Button>
          )}
          {runState === 'running' && (
            <button
              onClick={handleStop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 hover:bg-white/25 text-white text-xs font-medium rounded border border-white/20 transition-colors"
            >
              <Square size={11} fill="currentColor" /> Stop
            </button>
          )}
          {(runState === 'complete' || runState === 'stopped') && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 hover:bg-white/25 text-white text-xs font-medium rounded border border-white/20 transition-colors"
            >
              <RotateCcw size={11} /> Reset
            </button>
          )}
          {(runState === 'complete' || runState === 'stopped') && (
            <Button variant="orange" size="sm" onClick={handleRun}>
              <Play size={13} fill="currentColor" /> Run Again
            </Button>
          )}
        </div>
      </div>

      {/* Progress bar */}
      {runState !== 'idle' && (
        <div className="h-1 bg-gray-200 w-full">
          <div
            className={`h-full transition-all duration-300 ${
              runState === 'complete' ? 'bg-green-500' :
              runState === 'stopped'  ? 'bg-amber-500' : 'bg-orange-500'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Idle state — call to action */}
      {runState === 'idle' && (
        <div className="px-6 py-10 flex flex-col items-center justify-center text-center bg-gray-50">
          <div className="w-14 h-14 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center mb-4 shadow-sm">
            <Zap size={22} className="text-gray-300" />
          </div>
          <div className="text-base font-semibold text-gray-700 mb-1">{adeName} is Standing By</div>
          <div className="text-sm text-gray-400 max-w-sm mb-5">{triggerDescription}</div>
          <Button variant="orange" size="md" onClick={handleRun}>
            <Play size={14} fill="currentColor" /> {triggerLabel}
          </Button>
          <p className="text-[10px] text-gray-300 mt-3 uppercase tracking-wider">No workflows will execute until manually triggered</p>
        </div>
      )}

      {/* Live execution log */}
      {runState !== 'idle' && (
        <>
          <div
            ref={logRef}
            className="max-h-80 overflow-y-auto bg-white px-0 py-2 font-mono text-xs"
          >
            {liveSteps.map((step, i) => (
              <div
                key={step.id}
                className={`flex items-start gap-3 px-4 py-1.5 fade-in ${stepRowBg(step.type)}`}
              >
                <span className="text-gray-300 w-16 flex-shrink-0 pt-0.5">{step.timestamp}</span>
                <StepIcon type={step.type} isLast={i === liveSteps.length - 1} />
                <span className={`flex-1 leading-snug ${stepTextColor(step.type)}`}>{step.text}</span>
                {step.detail && <span className="text-gray-400 text-[10px] flex-shrink-0">{step.detail}</span>}
              </div>
            ))}
            {runState === 'running' && (
              <div className="flex items-center gap-3 px-4 py-2 text-gray-400">
                <span className="w-16 flex-shrink-0" />
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full pulse-dot" />
                <span className="italic">Processing...</span>
              </div>
            )}
          </div>

          {/* Footer stats */}
          <div className="px-5 py-2.5 bg-gray-50 border-t border-gray-100 flex items-center gap-5 text-[11px] text-gray-500">
            <span className="flex items-center gap-1.5">
              <Clock size={11} /> Steps: <strong className="text-gray-700">{currentIdx}/{steps.length}</strong>
            </span>
            {warnCount > 0 && (
              <span className="flex items-center gap-1.5 text-amber-600">
                <AlertTriangle size={11} /> Flags: <strong>{warnCount}</strong>
              </span>
            )}
            {emailCount > 0 && (
              <span className="flex items-center gap-1.5 text-blue-600">
                <Mail size={11} /> Sent: <strong>{emailCount}</strong>
              </span>
            )}
            {runState === 'complete' && (
              <span className="ml-auto flex items-center gap-1.5 text-green-600 font-medium">
                <CheckCircle size={11} /> Audit trail logged
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
};
