const partMock = [];

export function getPartsRepo() {
    return partMock;
}
export function createPartRepo(part) {
    partMock.push(part);
    return part;
}
export function getPartByIdRepo(id) {
    return partMock.find((part) =>part.id === id);

}

export function updatePartRepo(id,updatePart){
    const index = partMock.findIndex((part)=>part.id === id);
    if(index !== -1){
        partMock[index] ={...partMock[index], ...updatePart};
        return partMock[index];
    }
   return null;
}

export function deletePartRepo(id){
 const index =partMock.findIndex((part) => part.id === id);
 if(index !== -1){
    const deletedPart =partMock.splice(index,1);
    return deletedPart[0];
 }
 return null;
}