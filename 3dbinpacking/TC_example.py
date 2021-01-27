from py3dbp import Packer, Bin, Item

packer = Packer()

packer.add_bin(Bin('container', 100, 50, 50, 1000))

packer.add_item(Item('Palette', 40, 30, 10, 30))
packer.add_item(Item('Palette', 40, 30, 10, 30))
packer.add_item(Item('Palette', 40, 30, 10, 30))
packer.add_item(Item('Palette', 40, 30, 10, 30))

packer.add_item(Item('Gitterbox', 35, 25, 35, 30))
packer.add_item(Item('Gitterbox', 35, 25, 35, 30))
packer.add_item(Item('Gitterbox', 35, 25, 35, 30))


packer.add_item(Item('Pallet RP-2', 60, 20, 40, 50))
packer.add_item(Item('Pallet RP-2', 60, 20, 40, 50))
packer.add_item(Item('Pallet RP-2', 60, 20, 40, 50))


packer.add_item(Item('Custom1', 50, 10, 10, 30))
packer.add_item(Item('Custom1', 50, 10, 10, 30))
packer.add_item(Item('Custom1', 50, 10, 10, 30))
packer.add_item(Item('Custom1', 50, 10, 10, 30))
packer.add_item(Item('Custom1', 50, 10, 10, 30))


packer.pack()
x = 0
y = 0
elementDim = ["elementDim = [ "]
elementDest = ["elementDest = ["]
for b in packer.bins:
    print(":::::::::::", b.string())
    y += b.get_volume()

    print("FITTED ITEMS:")
    for item in b.items:
        print("====> ", item.string())
        x+= item.get_volume()
        if item.rotation_type==1:
            item.width, item.height = item.height, item.width
        elif item.rotation_type==2:
            item.width, item.depth = item.depth, item.width


        elementDim.append(
              "{width: "+str(int(item.width))+
              ", height: "+str(int(item.height))+
              ", depth: "+ str(int(item.depth))+"},"

              )
        elementDest.append(
            "{x: "+str(int(item.position[0]))+
            ", y:"+str(int(item.position[1]))+
            ", z:"+str(int(item.position[2]))+"},"
        )

    print("UNFITTED ITEMS:")
    for item in b.unfitted_items:
        print("====> ", item.string())


    for i in elementDim:
        print i
    print("]")

    for i in elementDest:
        print i
    print("]")

    print(str(round((x/y)*100)) +"% Auslastung")
    print("***************************************************")
    print("***************************************************")
