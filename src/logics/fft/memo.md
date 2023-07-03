https://atcoder.jp/contests/atc001/submissions/450958

static Cplx[] DFT_naive(Cplx[] a,bool inv){
		Cplx[] ret=new Cplx[N];
		int sig=inv?-1:1;
		
		for(int i=0;i<N;i++){
			Cplx c=a[0];
			Cplx xi=Cplx.Exp(sig*i*2.0*Math.PI*Cplx.I/(Cplx)N);
			Cplx xx=xi;
			for(int j=1;j<N;j++){
				c+=a[j]*xx;
				xx*=xi;
			}
			ret[i]=c;
			if(inv)ret[i]/=(Cplx)N;
		}
		return ret;
	}
	
	static Cplx[] FFT(Cplx[] a,bool inv){
		Cplx[] ret=recFFT(a,inv);
		if(inv){
			for(int i=0;i<ret.Length;i++){
				ret[i]/=(double)N;
			}
		}
		return ret;
	}
	
	static Cplx[] recFFT(Cplx[] a,bool inv){
		if(a.Length==1){
			return new Cplx[]{a[0]};
		}
		int nn=a.Length;
		
		int sig=inv?-1:1;
		Cplx xi=Cplx.Exp(sig*2.0*Math.PI*Cplx.I/(Cplx)nn);
		
		Cplx[] a0=new Cplx[nn/2];
		Cplx[] a1=new Cplx[nn/2];
		for(int i=0;i<nn;i+=2){
			a0[i/2]=a[i];
			a1[i/2]=a[i+1];
		}
		
		Cplx[] a0hat=recFFT(a0,inv);
		Cplx[] a1hat=recFFT(a1,inv);
		
		Cplx[] ret=new Cplx[nn];
		Cplx xx=1;

		for(int i=0;i<nn;i++){
			ret[i]=a0hat[i%(nn/2)]+xx*a1hat[i%(nn/2)];
			xx*=xi;
		}
		return ret;
	}
