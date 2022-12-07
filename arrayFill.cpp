

#include <iostream>
#include <map>
#include <string>
#include <vector>
struct node
{
    int val;
    struct node *left;
    struct node *right;
};

class ArrayMethods
{
public:
    ArrayMethods(){};
    void fillArray(int *array, int length)
    {

        int i = 0;
        while (i < length)
        {

            array[i] = i;

            i++;
        }
    }
    void printArrayValues(int *array, int length)
    {

        int i = 0;

        while (i < length)
        {

            std::cout << array[i] << std::endl;
            i++;
        }
    }
    void tree(std::map<std::string, int> &dic, int *array, int length)
    {
        let i = 0;
        while (i < length)
        {

            if(dic.count()){

                
            }

        i++; 
        }
    }
};

int main()
{

    int length = 55;
    int array[length]{};

    ArrayMethods arrayObject = ArrayMethods{};

    arrayObject.fillArray(array, length);

    arrayObject.printArrayValues(array, length);
    std::map<std::string, int> dic{};

    arrayObject.tree(dic, array, length)

        dic["hello"] = 7;

    std::cout << dic["hello"] << std::endl;
}
EOF