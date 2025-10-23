"use client";

import React, { useState } from 'react';
import { ExternalLink, Github, BookOpen, Code, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import NavbarHeader from '../components/Navbar';
import SocialSidebar from '../components/SocialSidebar';
import ContactModal from '../components/ContactModal';

interface NotebookCell {
  type: 'markdown' | 'code';
  content: string;
  collapsed?: boolean;
}

const VoiceCloningPage = () => {
  const [expandedCells, setExpandedCells] = useState<Set<number>>(new Set([0, 1, 2]));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleCell = (index: number) => {
    const newExpanded = new Set(expandedCells);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedCells(newExpanded);
  };

  const notebookCells: NotebookCell[] = [
    {
      type: 'markdown',
      content: `# أداة استنساخ وتغيير الصوت

هذا مشروع متكامل لاستنساخ الأصوات وتغييرها باستخدام تقنيات الذكاء الاصطناعي المتقدمة.

**المشروع على GitHub:** [Msr7799/V-cloning_V-changging](https://github.com/Msr7799/V-cloning_V-changging)`
    },
    {
      type: 'markdown',
      content: `## المرحلة الأساسية: تجهيز البرنامج

في هذه المرحلة، سنقوم بتثبيت جميع المكتبات والإضافات المطلوبة لتشغيل نموذج RVC (Retrieval-based Voice Conversion).`
    },
    {
      type: 'code',
      content: `#@title الخطوة الأساسية - تجهيز البرنامج
%cd /content
from IPython.display import clear_output
from ipywidgets import Button
import subprocess, shlex, os
from google.colab import drive

var = "We"+"bU"+"I"
test = "Voice"
c_word = "Conversion"
r_word = "Retrieval"
!git clone https://github.com/T-GOO/T-GO /content/RVC

!pip install git+https://github.com/One-sixth/fairseq.git

import tensorflow as tf
print("Num GPUs Available:", len(tf.config.experimental.list_physical_devices('GPU')))

!pip uninstall tensorflow -y
!pip install tensorflow==2.12.0

# تحميل النماذج المدربة مسبقاً
!apt -y install -qq aria2
pretrains = ["f0D32k.pth","f0G32k.pth"]
new_pretrains = ["f0Ov2Super32kD.pth","f0Ov2Super32kG.pth"]

for file in pretrains:
    if not os.path.exists(f"/content/RVC/assets/pretrained_v2/{file}"):
        command = "aria2c --console-log-level=error -c -x 16 -s 16 -k 1M https://huggingface.co/lj1995/%s%s%s/resolve/main/pretrained_v2/%s -d /content/RVC/assets/pretrained_v2 -o %s" % ("Voice","Conversion","WebUI",file,file)
        subprocess.run(shlex.split(command))

clear_output()
Button(description="✔ Success", button_style="success")`
    },
    {
      type: 'markdown',
      content: `## المرحلة الأولى: استنساخ الصوت

### الخطوة 1: تحميل الصوت

قم برفع ملف صوتي نظيف مدته من 3 إلى 7 دقائق للحصول على أفضل النتائج.`
    },
    {
      type: 'code',
      content: `#@title الخطوة 1: تحميل الصوت
import os
from IPython.display import Audio
from IPython.core.display import display

upload_method = 'Upload' #@param ['Upload']

if not os.path.exists('/content/dataset'):
    os.makedirs('/content/dataset')

if os.path.isfile('/content/dataset/vocal_audio.wav'):
    os.remove('/content/dataset/vocal_audio.wav')

def displayAudio():
  display(Audio('/content/dataset/vocal_audio.wav'))

if upload_method == 'Upload':
  from google.colab import files
  uploaded = files.upload()
  for fn in uploaded.keys():
    print('User uploaded file "{name}" with length {length} bytes.'.format(
        name=fn, length=len(uploaded[fn])))

  PATH_TO_YOUR_AUDIO = str(list(uploaded.keys())[0])
  
  import librosa
  audio, sr = librosa.load(PATH_TO_YOUR_AUDIO, sr=None)
  
  import soundfile as sf
  sf.write('/content/dataset/vocal_audio.wav', audio, sr, format='wav')

print("DONE.")`
    },
    {
      type: 'markdown',
      content: `### الخطوة 2: إنشاء ملفات التدريب

في هذه الخطوة، سنقوم بمعالجة الصوت واستخراج الخصائص اللازمة للتدريب.`
    },
    {
      type: 'code',
      content: `#@title الخطوة 2: إنشاء ملفات التدريب
# تثبيت الحزم الناقصة
!pip install praat-parselmouth ipywidgets ffmpeg-python av pyworld tensorboardX -q
!pip install torch torchvision torchaudio --upgrade -q
!pip install faiss-cpu -q

# إصلاح مشكلة Fairseq + PyTorch
import torch, fairseq
torch.serialization.add_safe_globals([fairseq.data.dictionary.Dictionary])
torch.serialization.add_safe_globals([fairseq.tasks.text_to_speech.TextToSpeechTask])

%cd /content/RVC
model_name = 'msr'#@param {type:"string"}
dataset_folder = '/content/dataset'

# المعالجة المسبقة
!mkdir -p ./logs/{model_name}
print("⚙️ بدء مرحلة preprocessing ...")
!python infer/modules/train/preprocess.py {dataset_folder} 32000 2 ./logs/{model_name} False 3.0

# استخراج F0 و Features
f0method = "rmvpe_gpu"
print("🎵 بدء استخراج F0 ...")

if f0method != "rmvpe_gpu":
    !python infer/modules/train/extract/extract_f0_print.py ./logs/{model_name} 2 {f0method}
else:
    !python infer/modules/train/extract/extract_f0_rmvpe.py 1 0 0 ./logs/{model_name} True

print("🎛️ استخراج Features ...")
!python infer/modules/train/extract_feature_print.py cuda:0 1 0 ./logs/{model_name} v2 True

# بناء الفهرس (FAISS index)
import numpy as np, faiss
from sklearn.cluster import MiniBatchKMeans

def train_index(exp_dir1, version19):
    exp_dir = f"logs/{exp_dir1}"
    feature_dir = f"{exp_dir}/3_feature768" if version19 == "v2" else f"{exp_dir}/3_feature256"
    npys = [np.load(os.path.join(feature_dir, n)) for n in sorted(os.listdir(feature_dir)) if n.endswith('.npy')]
    big_npy = np.concatenate(npys, 0)
    n_ivf = min(int(16 * np.sqrt(big_npy.shape[0])), big_npy.shape[0] // 39)
    index = faiss.index_factory(big_npy.shape[1], f"IVF{n_ivf},Flat")
    index.train(big_npy)
    for i in range(0, big_npy.shape[0], 8192):
        index.add(big_npy[i:i+8192])
    faiss.write_index(index, f"{exp_dir}/added_IVF{n_ivf}_Flat.index")
    print("✅ تم بناء الفهرس بنجاح!")

train_index(model_name, 'v2')`
    },
    {
      type: 'markdown',
      content: `### الخطوة 3: تدريب النموذج

الآن سنبدأ بتدريب النموذج على بيانات الصوت المحملة. القيمة الموصى بها: 200-1000 epoch.`
    },
    {
      type: 'code',
      content: `#@title الخطوة 3: نموذج التدريب
%cd /content/RVC
from random import shuffle
import json
import os
import pathlib
from subprocess import Popen, PIPE, STDOUT
now_dir=os.getcwd()

model_name = ''#@param {type:"string"}
save_frequency = 20
epochs = 120 # @param {type:"slider", min:50, max:2000, step:10}
batch_size = 8
sample_rate='32k'
OV2=True

if OV2:
    G_file=f'assets/pretrained_v2/f0Ov2Super{sample_rate}G.pth'
    D_file=f'assets/pretrained_v2/f0Ov2Super{sample_rate}D.pth'
else:
    G_file=f'assets/pretrained_v2/f0G{sample_rate}.pth'
    D_file=f'assets/pretrained_v2/f0D{sample_rate}.pth'

%load_ext tensorboard
%tensorboard --logdir ./logs --port=8888

if "cache" not in locals():
    cache = False
    
training_log = click_train(
    model_name,
    sample_rate,
    True,
    0,
    save_frequency,
    epochs,
    batch_size,
    True,
    G_file,
    D_file,
    0,
    cache,
    True,
    'v2',
)
print(training_log)`
    },
    {
      type: 'markdown',
      content: `## المرحلة الثانية: استبدال الصوت

بعد تدريب النموذج، يمكنك الآن استخدامه لتحويل أي صوت إلى الصوت المستهدف.`
    },
    {
      type: 'code',
      content: `#@title الخطوة النهائية: تشغيل الاستدلال
import os, sys, shutil, subprocess, shlex, glob, time
import IPython.display as ipd
from colorama import Fore

%cd /content/RVC
!pip install torchcrepe soundfile -q

model_name = 'msr'#@param {type:"string"}
model_filename = model_name + '.pth'

# إعدادات التحويل
pitch = 0 # @param {type:"slider", min:-12, max:12, step:1}
# ذكر لذكر أو أنثى لأنثى: 0
# من أنثى إلى ذكر: -12
# من ذكر إلى أنثى: 12

f0_method = "rmvpe" # @param ["rmvpe", "pm", "harvest"]
input_path = "/content/sample_data/input_audio.wav"
save_as = "/content/RVC/audios/output_audio.wav"
index_rate = 0.5 # @param {type:"slider", min:0, max:1, step:0.01}
volume_normalization = 0.3
consonant_protection = 0.5

!python tools/cmd/infer_cli.py --f0up_key $pitch --input_path $input_path --f0method $f0_method --opt_path $save_as --model_name $model_filename --index_rate $index_rate --device "cuda:0" --is_half True --filter_radius 3 --resample_sr 32000 --rms_mix_rate $volume_normalization --protect $consonant_protection

ipd.Audio(save_as)`
    },
    {
      type: 'markdown',
      content: `## نصائح للحصول على أفضل النتائج

1. **جودة الصوت**: استخدم ملفات صوتية عالية الجودة ونظيفة من الضوضاء
2. **مدة التسجيل**: 3-7 دقائق هي المدة المثالية للتدريب
3. **Pitch Adjustment**: 
   - 0 للحفاظ على نفس الطبقة الصوتية
   - +12 لتحويل صوت ذكر لأنثى
   - -12 لتحويل صوت أنثى لذكر
4. **Index Rate**: قيمة أعلى = تشابه أكبر مع الصوت الأصلي
5. **Consonant Protection**: يحسن وضوح الحروف الساكنة

## المصادر والروابط

- **مستودع المشروع**: [GitHub - V-cloning_V-changging](https://github.com/Msr7799/V-cloning_V-changging)
- **RVC Project**: تقنية Retrieval-based Voice Conversion
- **Google Colab**: منصة التشغيل السحابية المجانية`
    }
  ];

  return (
    <div className="bg-user-bg">
      {/* Logo on the far left */}
      <div className="fixed -mt-20 left-8 z-40 animate-fadeIn">
        <Image
          src="/img/bg-img/Portfoloi.gif"
          alt="Portfolio Logo"
          width={32}
          height={110}
          className="hover:scale-105 duration-300 cursor-pointer"
          priority
        />
      </div>

      <NavbarHeader />
      <div className="gradient-background-overlay"></div>
      <SocialSidebar onMessageClick={() => setIsModalOpen(true)} />

      <div className="min-h-screen pt-24 pb-20 text-light">
      {/* Header */}
      <div className="border-b border-slate/30 glass-dark backdrop-blur-sm sticky top-24 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-primary-glow to-primary-hover rounded-lg">
                <BookOpen className="w-6 h-6 text-light" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-hover/50 via-primary-hover to-primary-hover/50 bg-clip-text text-transparent">
                  Voice Cloning & Voice Changing
                </h1>
                <p className="text-sm text-slate">Interactive Jupyter Notebook</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <a
                href="https://github.com/Msr7799/V-cloning_V-changging"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-very-dark-bg hover:bg-dark rounded-lg transition-all duration-200 border border-slate/30 hover:border-primary-glow/50"
              >
                <Github className="w-5 h-5 text-light" />
                <span className="hidden sm:inline text-light">GitHub</span>
              </a>
              <a
                href="https://colab.research.google.com/github/Msr7799/V-cloning_V-changging/blob/main/T_GO_AI_RVC_Training_%D9%85%D8%B9_%D9%83%D9%84_%D8%A7%D9%84%D9%85%D9%85%D9%8A%D8%B2%D8%A7%D8%AA.ipynb"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-block"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-glow to-primary-hover rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <button className="relative px-4 py-2 bg-gradient-to-r from-very-dark-bg to-dark rounded-lg flex items-center gap-2 hover:scale-105 transition-all duration-300 border border-primary-glow/30">
                  <Image src="/img/core-img/colab-icon-48.svg" alt="Colab" width={20} height={20} />
                  <span className="text-light font-medium">Open in Colab</span>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Info Card */}
        <div className="mb-8 glass-dark rounded-3xl p-8 shadow-2xl border border-slate/30 hover:border-primary-glow/50 transition-all duration-500">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-br from-primary-glow/20 to-primary-hover/20 rounded-lg border border-slate/30">
              <Code className="w-6 h-6 text-primary-hover" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-3 text-light">About This Project</h2>
              <p className="text-light/90 text-lg leading-relaxed mb-4">
                أداة متكاملة لاستنساخ الأصوات وتغييرها باستخدام تقنيات الذكاء الاصطناعي المتقدمة. 
                يمكنك تدريب نموذج خاص بك على أي صوت واستخدامه لتحويل أي تسجيل صوتي آخر.
              </p>
              <div className="flex items-center gap-2 text-slate">
                <Github className="w-4 h-4" />
                <span>المشروع متاح على:</span>
                <a 
                  href="https://github.com/Msr7799/V-cloning_V-changging"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-hover hover:text-primary-glow underline font-semibold"
                >
                  github.com/Msr7799/V-cloning_V-changging
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Notebook Cells */}
        <div className="space-y-4">
          {notebookCells.map((cell, index) => (
            <div 
              key={index}
              className="glass-dark rounded-xl border border-slate/30 overflow-hidden hover:border-primary-glow/40 transition-all duration-300"
            >
              <button
                onClick={() => toggleCell(index)}
                className="w-full px-4 py-3 flex items-center justify-between bg-very-dark-bg/50 hover:bg-very-dark-bg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                    cell.type === 'markdown' 
                      ? 'bg-primary-glow/20 text-primary-hover border-primary-glow/30' 
                      : 'bg-primary-hover/20 text-light border-primary-hover/30'
                  }`}>
                    {cell.type === 'markdown' ? 'Markdown' : 'Code'}
                  </div>
                  <span className="text-sm text-slate">Cell {index + 1}</span>
                </div>
                {expandedCells.has(index) ? (
                  <ChevronUp className="w-5 h-5 text-slate" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate" />
                )}
              </button>
              
              {expandedCells.has(index) && (
                <div className="p-6 bg-very-dark-bg/30">
                  {cell.type === 'markdown' ? (
                    <div 
                      className="prose prose-invert max-w-none prose-headings:text-primary-hover prose-p:text-light/90 prose-strong:text-light prose-a:text-primary-hover prose-code:text-primary-glow"
                      dangerouslySetInnerHTML={{ 
                        __html: cell.content
                          .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-4 text-light">$1</h1>')
                          .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mb-3 mt-6 text-primary-hover">$1</h2>')
                          .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mb-2 mt-4 text-light">$1</h3>')
                          .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-light">$1</strong>')
                          .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary-hover hover:text-primary-glow underline font-semibold">$1</a>')
                          .replace(/`(.*?)`/g, '<code class="px-2 py-1 bg-very-dark-bg rounded text-primary-glow border border-slate/20">$1</code>')
                          .replace(/^- (.*$)/gim, '<li class="ml-4 text-light/90">$1</li>')
                          .replace(/\n\n/g, '</p><p class="mb-3 text-light/90">')
                          .replace(/^(?!<[h|l|p])(.*$)/gim, '<p class="mb-3 text-light/90">$1</p>')
                      }}
                    />
                  ) : (
                    <pre className="bg-[#1e1e1e] p-6 rounded-lg overflow-x-auto border border-slate/30 shadow-2xl">
                      <code 
                        className="text-sm font-mono leading-relaxed block whitespace-pre"
                        style={{ color: '#D4D4D4' }}
                        dangerouslySetInnerHTML={{
                          __html: cell.content
                            // Comments (أخضر)
                            .replace(/(#.*$)/gm, '<span style="color: #6A9955;">$1</span>')
                            // Strings (برتقالي)
                            .replace(/(['"])(.*?)\1/g, '<span style="color: #CE9178;">$1$2$1</span>')
                            // Keywords (بنفسجي/وردي)
                            .replace(/\b(from|import|if|for|in|not|as|def|class|return|try|except|with|while|elif|else|and|or|is|True|False|None)\b/g, '<span style="color: #C586C0;">$1</span>')
                            // Functions (أصفر)
                            .replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, '<span style="color: #DCDCAA;">$1</span>(')
                            // Numbers (أخضر فاتح)
                            .replace(/\b(\d+\.?\d*)\b/g, '<span style="color: #B5CEA8;">$1</span>')
                            // Variables after = (أزرق فاتح)
                            .replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*=/g, '<span style="color: #9CDCFE;">$1</span> =')
                        }}
                      />
                    </pre>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 glass-dark rounded-3xl p-10 shadow-2xl border border-slate/30 hover:border-primary-glow/50 transition-all duration-500 text-center">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary-hover/50 via-primary-hover to-primary-hover/50 bg-clip-text text-transparent">
            Ready to Clone Your Voice?
          </h3>
          <p className="text-light/90 text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            افتح هذا الـ Notebook في Google Colab وابدأ في تدريب نموذجك الخاص خلال دقائق. 
            مجاني بالكامل ولا يتطلب أي تثبيت محلي!
          </p>
          <a
            href="https://colab.research.google.com/github/Msr7799/V-cloning_V-changging/blob/main/T_GO_AI_RVC_Training_%D9%85%D8%B9_%D9%83%D9%84_%D8%A7%D9%84%D9%85%D9%85%D9%8A%D8%B2%D8%A7%D8%AA.ipynb"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-block"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-glow to-primary-hover rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <button className="relative px-12 py-5 bg-gradient-to-r from-very-dark-bg to-dark rounded-xl flex items-center gap-3 hover:scale-105 transition-all duration-300">
              <Image src="/img/core-img/colab-icon-48.svg" alt="Colab" width={28} height={28} />
              <span className="text-xl font-semibold text-light">Open in Google Colab</span>
            </button>
          </a>
        </div>
      </div>

      {isModalOpen && <ContactModal onClose={() => setIsModalOpen(false)} />}

      <footer className="text-center py-6 text-md text-gray-600">
        <p>
          Copyright &copy;{new Date().getFullYear()} All rights reserved | Made with{" "}
          <i className="fa fa-heart-o" aria-hidden="true"></i> by Mohamed Saud Alromaihi
        </p>
      </footer>
    </div>
    </div>
  );
};

export default VoiceCloningPage;
