#include <stdio.h>
#include <string.h>
char c[1000];
void input()
{
    printf("Nhap vao mot chuoi xau ki tu: ");
    fgets(c, sizeof(c), stdin);
}

void kt()
{
    int t;
    t = strlen(c);
    if(t=0)
    printf("Rong\n");
    else
    printf("Khong rong\n");
}

void solanxuathien()
{
    char q;
    int count=0;
    printf("Nhap ki tu muon gap: ");
    scanf("%s",&q);

    printf("So luong ki tu co trong c : %d\n", strlen(c));
    printf("%x\n",(unsigned int)c[0]);
    printf("%c\n",c[0]);
    printf("%x\n",(unsigned int)q);

    for(int i=0; i<strlen(c); i++)
    {
        if((unsigned int)c[i] == (unsigned int)q)
        {
            count ++;

        }
    }
    printf("So lan so nhap xuat hien trong mang la: %d\n",count);

}

void hoathanhthuong()
{
    for(int i=0; i<=strlen(c); i++)
    {
        if(c[i]>=65 && c[i] <= 90)
        {
            c[i]= c[i] + 32;
        }
    }

}

void output()
{
    printf("\nc: ");
    for(int i=0; i<strlen(c); i++)
    {
        printf("%c",c[i]);
    }
}

void thuongthanhhoa()
{
    for(int i=0; i<=strlen(c); i++)
    {
        if(c[i]>=97 && c[i] <= 122)
        {
            c[i]= c[i] - 32;
        }
    }
    
}
void inhoachucaidautien()
{
    for(int j=0; j<strlen(c); j++)
    {
        if(c[j]>=97 && c[j] <= 122)
        {
            c[j]= c[j] - 32;
        }
        break;

    }
    if(c[0]>=97 && c[0] <= 122)
        {
            c[0]= c[0] - 32;
        }
    for(int i=0; i<strlen(c); i++)
    {
        if(c[i]==32)
        {
            if(c[i+1]>=97 && c[i+1] <= 122)
        {
            c[i+1]= c[i+1] - 32;
        }
        }
    }
}
int main()
{
    input();
    kt();
    solanxuathien();
    thuongthanhhoa();
    output();
    hoathanhthuong();
    output();
    inhoachucaidautien();
    output();
    
}